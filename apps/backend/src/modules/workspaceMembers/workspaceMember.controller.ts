import { Request, Response } from "express";
import createHttpError from "http-errors";
import { prisma } from "../../config/prisma";
import { parseValidationError } from "@/utils/parseValidationError";
import { addWorkspaceMemberSchema, updateWorkspaceMemberSchema } from "./workspaceMember.schema";

function getUserId(req: Request) {
  return req.user?.id as string;
}

function getWorkspaceId(req: Request) {
  const id = req.params.workspaceId;
  if (typeof id !== "string" || id.length === 0) {
    throw createHttpError(400, "Workspace id is required");
  }
  return id;
}

function getMemberId(req: Request) {
  const id = req.params.memberId;
  if (typeof id !== "string" || id.length === 0) {
    throw createHttpError(400, "Member id is required");
  }
  return id;
}

async function getWorkspaceMembership(workspaceId: string, userId: string) {
  return prisma.workspaceMember.findFirst({ where: { workspaceId, userId } });
}

export async function addWorkspaceMember(req: Request, res: Response) {
  const parsed = addWorkspaceMemberSchema.safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }

  const workspaceId = getWorkspaceId(req);
  const userId = getUserId(req);
  const requesterMembership = await getWorkspaceMembership(workspaceId, userId);
  if (!requesterMembership || !["OWNER", "ADMIN"].includes(requesterMembership.role)) {
    throw createHttpError(403, "Forbidden");
  }

  const targetUser = await prisma.user.findUnique({ where: { id: parsed.data.userId } });
  if (!targetUser) {
    throw createHttpError(404, "User not found");
  }

  const existingMember = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: parsed.data.userId,
      },
    },
  });
  if (existingMember) {
    throw createHttpError(409, "User is already a member of this workspace");
  }

  const member = await prisma.workspaceMember.create({
    data: {
      workspaceId,
      userId: parsed.data.userId,
      role: parsed.data.role,
    },
    include: { user: true },
  });

  return res.status(201).json({ success: true, message: "Member added successfully", data: member });
}

export async function listWorkspaceMembers(req: Request, res: Response) {
  const workspaceId = getWorkspaceId(req);
  const userId = getUserId(req);
  const membership = await getWorkspaceMembership(workspaceId, userId);
  if (!membership) {
    throw createHttpError(403, "Forbidden");
  }

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  return res.status(200).json({ success: true, message: "Workspace members fetched successfully", data: members });
}

export async function updateWorkspaceMember(req: Request, res: Response) {
  const parsed = updateWorkspaceMemberSchema.safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }

  const workspaceId = getWorkspaceId(req);
  const memberId = getMemberId(req);
  const userId = getUserId(req);
  const requesterMembership = await getWorkspaceMembership(workspaceId, userId);
  if (!requesterMembership || requesterMembership.role !== "OWNER") {
    throw createHttpError(403, "Forbidden");
  }
  if ((parsed.data.role as string) === "OWNER") {
    throw createHttpError(400, "Cannot assign OWNER role");
  }

  const member = await prisma.workspaceMember.findFirst({ where: { id: memberId, workspaceId }, include: { user: true } });
  if (!member) {
    throw createHttpError(404, "Member not found");
  }

  const updatedMember = await prisma.workspaceMember.update({
    where: { id: memberId },
    data: { role: parsed.data.role },
    include: { user: true },
  });

  return res.status(200).json({ success: true, message: "Member role updated successfully", data: updatedMember });
}

export async function deleteWorkspaceMember(req: Request, res: Response) {
  const workspaceId = getWorkspaceId(req);
  const memberId = getMemberId(req);
  const userId = getUserId(req);
  const requesterMembership = await getWorkspaceMembership(workspaceId, userId);
  if (!requesterMembership || requesterMembership.role !== "OWNER") {
    throw createHttpError(403, "Forbidden");
  }

  const member = await prisma.workspaceMember.findFirst({ where: { id: memberId, workspaceId } });
  if (!member) {
    throw createHttpError(404, "Member not found");
  }
  if (member.role === "OWNER") {
    throw createHttpError(400, "Cannot remove OWNER");
  }

  await prisma.workspaceMember.delete({ where: { id: memberId } });

  return res.status(200).json({ success: true, message: "Member removed successfully" });
}
