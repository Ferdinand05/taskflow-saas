"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWorkspaceMember = addWorkspaceMember;
exports.listWorkspaceMembers = listWorkspaceMembers;
exports.updateWorkspaceMember = updateWorkspaceMember;
exports.deleteWorkspaceMember = deleteWorkspaceMember;
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = require("../../config/prisma");
const parseValidationError_1 = require("@/utils/parseValidationError");
const workspaceMember_schema_1 = require("./workspaceMember.schema");
function getUserId(req) {
    return req.user?.id;
}
function getWorkspaceId(req) {
    const id = req.params.workspaceId;
    if (typeof id !== "string" || id.length === 0) {
        throw (0, http_errors_1.default)(400, "Workspace id is required");
    }
    return id;
}
function getMemberId(req) {
    const id = req.params.memberId;
    if (typeof id !== "string" || id.length === 0) {
        throw (0, http_errors_1.default)(400, "Member id is required");
    }
    return id;
}
async function getWorkspaceMembership(workspaceId, userId) {
    return prisma_1.prisma.workspaceMember.findFirst({ where: { workspaceId, userId } });
}
async function addWorkspaceMember(req, res) {
    const parsed = workspaceMember_schema_1.addWorkspaceMemberSchema.safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const workspaceId = getWorkspaceId(req);
    const userId = getUserId(req);
    const requesterMembership = await getWorkspaceMembership(workspaceId, userId);
    if (!requesterMembership || !["OWNER", "ADMIN"].includes(requesterMembership.role)) {
        throw (0, http_errors_1.default)(403, "Forbidden");
    }
    const targetUser = await prisma_1.prisma.user.findUnique({ where: { id: parsed.data.userId } });
    if (!targetUser) {
        throw (0, http_errors_1.default)(404, "User not found");
    }
    const existingMember = await prisma_1.prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId: parsed.data.userId,
            },
        },
    });
    if (existingMember) {
        throw (0, http_errors_1.default)(409, "User is already a member of this workspace");
    }
    const member = await prisma_1.prisma.workspaceMember.create({
        data: {
            workspaceId,
            userId: parsed.data.userId,
            role: parsed.data.role,
        },
        include: { user: true },
    });
    return res.status(201).json({ success: true, message: "Member added successfully", data: member });
}
async function listWorkspaceMembers(req, res) {
    const workspaceId = getWorkspaceId(req);
    const userId = getUserId(req);
    const membership = await getWorkspaceMembership(workspaceId, userId);
    if (!membership) {
        throw (0, http_errors_1.default)(403, "Forbidden");
    }
    const members = await prisma_1.prisma.workspaceMember.findMany({
        where: { workspaceId },
        include: { user: true },
        orderBy: { createdAt: "asc" },
    });
    return res.status(200).json({ success: true, message: "Workspace members fetched successfully", data: members });
}
async function updateWorkspaceMember(req, res) {
    const parsed = workspaceMember_schema_1.updateWorkspaceMemberSchema.safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const workspaceId = getWorkspaceId(req);
    const memberId = getMemberId(req);
    const userId = getUserId(req);
    const requesterMembership = await getWorkspaceMembership(workspaceId, userId);
    if (!requesterMembership || requesterMembership.role !== "OWNER") {
        throw (0, http_errors_1.default)(403, "Forbidden");
    }
    if (parsed.data.role === "OWNER") {
        throw (0, http_errors_1.default)(400, "Cannot assign OWNER role");
    }
    const member = await prisma_1.prisma.workspaceMember.findFirst({ where: { id: memberId, workspaceId }, include: { user: true } });
    if (!member) {
        throw (0, http_errors_1.default)(404, "Member not found");
    }
    const updatedMember = await prisma_1.prisma.workspaceMember.update({
        where: { id: memberId },
        data: { role: parsed.data.role },
        include: { user: true },
    });
    return res.status(200).json({ success: true, message: "Member role updated successfully", data: updatedMember });
}
async function deleteWorkspaceMember(req, res) {
    const workspaceId = getWorkspaceId(req);
    const memberId = getMemberId(req);
    const userId = getUserId(req);
    const requesterMembership = await getWorkspaceMembership(workspaceId, userId);
    if (!requesterMembership || requesterMembership.role !== "OWNER") {
        throw (0, http_errors_1.default)(403, "Forbidden");
    }
    const member = await prisma_1.prisma.workspaceMember.findFirst({ where: { id: memberId, workspaceId } });
    if (!member) {
        throw (0, http_errors_1.default)(404, "Member not found");
    }
    if (member.role === "OWNER") {
        throw (0, http_errors_1.default)(400, "Cannot remove OWNER");
    }
    await prisma_1.prisma.workspaceMember.delete({ where: { id: memberId } });
    return res.status(200).json({ success: true, message: "Member removed successfully" });
}
//# sourceMappingURL=workspaceMember.controller.js.map