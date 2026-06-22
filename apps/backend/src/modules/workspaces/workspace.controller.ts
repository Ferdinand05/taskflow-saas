import { Request, Response } from "express";
import createHttpError from "http-errors";
import { prisma } from "../../config/prisma";
import { parseValidationError } from "@/utils/parseValidationError";
import { createWorkspaceSchema, updateWorkspaceSchema } from "./workspace.schema";

function getUserId(req: Request) {
  return req.user?.id as string;
}

function getWorkspaceId(req: Request) {
  const id = req.params.id;
  if (typeof id !== "string" || id.length === 0) {
    throw createHttpError(400, "Workspace id is required");
  }
  return id;
}

export async function createWorkspace(req: Request, res: Response) {
  const parsed = createWorkspaceSchema.safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }

  const userId = getUserId(req);
  const workspace = await prisma.$transaction(async (tx) => {
    const createdWorkspace = await tx.workspace.create({
      data: {
        name: parsed.data.name,
        description: parsed.data.description ?? null,
        ownerId: userId,
      },
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: createdWorkspace.id,
        userId,
        role: "OWNER",
      },
    });

    return createdWorkspace;
  });

  return res.status(201).json({
    success: true,
    message: "Workspace created successfully",
    data: workspace,
  });
}

export async function listWorkspaces(req: Request, res: Response) {
  const userId = getUserId(req);
  const workspaces = await prisma.workspace.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json({ success: true, message: "Workspaces fetched successfully", data: workspaces });
}

export async function getWorkspaceById(req: Request, res: Response) {
  const userId = getUserId(req);
  const workspaceId = getWorkspaceId(req);
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId as string,
      members: {
        some: { userId: userId as string },
      },
    },
    include: {
      members: true,
    },
  });

  if (!workspace) {
    throw createHttpError(404, "Workspace not found");
  }

  return res.status(200).json({ success: true, message: "Workspace fetched successfully", data: workspace });
}

export async function updateWorkspace(req: Request, res: Response) {
  const parsed = updateWorkspaceSchema.safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }

  const userId = getUserId(req);
  const workspaceId = getWorkspaceId(req);
  const membership = await prisma.workspaceMember.findFirst({ where: { workspaceId: workspaceId as string, userId: userId as string } });
  if (!membership || membership.role !== "OWNER") {
    throw createHttpError(403, "Forbidden");
  }

  const data: { name?: string; description?: string | null } = {};
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;

  const workspace = await prisma.workspace.update({
    where: { id: workspaceId as string },
    data,
  });

  return res.status(200).json({ success: true, message: "Workspace updated successfully", data: workspace });
}

export async function deleteWorkspace(req: Request, res: Response) {
  const userId = getUserId(req);
  const workspaceId = getWorkspaceId(req);
  const membership = await prisma.workspaceMember.findFirst({ where: { workspaceId: workspaceId as string, userId: userId as string } });
  if (!membership || membership.role !== "OWNER") {
    throw createHttpError(403, "Forbidden");
  }

  await prisma.workspace.delete({ where: { id: workspaceId } });

  return res.status(200).json({ success: true, message: "Workspace deleted successfully" });
}
