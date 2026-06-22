"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspace = createWorkspace;
exports.listWorkspaces = listWorkspaces;
exports.getWorkspaceById = getWorkspaceById;
exports.updateWorkspace = updateWorkspace;
exports.deleteWorkspace = deleteWorkspace;
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = require("../../config/prisma");
const parseValidationError_1 = require("@/utils/parseValidationError");
const workspace_schema_1 = require("./workspace.schema");
function getUserId(req) {
    return req.user?.id;
}
function getWorkspaceId(req) {
    const id = req.params.id;
    if (typeof id !== "string" || id.length === 0) {
        throw (0, http_errors_1.default)(400, "Workspace id is required");
    }
    return id;
}
async function createWorkspace(req, res) {
    const parsed = workspace_schema_1.createWorkspaceSchema.safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const userId = getUserId(req);
    const workspace = await prisma_1.prisma.$transaction(async (tx) => {
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
async function listWorkspaces(req, res) {
    const userId = getUserId(req);
    const workspaces = await prisma_1.prisma.workspace.findMany({
        where: {
            members: {
                some: { userId },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ success: true, message: "Workspaces fetched successfully", data: workspaces });
}
async function getWorkspaceById(req, res) {
    const userId = getUserId(req);
    const workspaceId = getWorkspaceId(req);
    const workspace = await prisma_1.prisma.workspace.findFirst({
        where: {
            id: workspaceId,
            members: {
                some: { userId: userId },
            },
        },
        include: {
            members: true,
        },
    });
    if (!workspace) {
        throw (0, http_errors_1.default)(404, "Workspace not found");
    }
    return res.status(200).json({ success: true, message: "Workspace fetched successfully", data: workspace });
}
async function updateWorkspace(req, res) {
    const parsed = workspace_schema_1.updateWorkspaceSchema.safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const userId = getUserId(req);
    const workspaceId = getWorkspaceId(req);
    const membership = await prisma_1.prisma.workspaceMember.findFirst({ where: { workspaceId: workspaceId, userId: userId } });
    if (!membership || membership.role !== "OWNER") {
        throw (0, http_errors_1.default)(403, "Forbidden");
    }
    const data = {};
    if (parsed.data.name !== undefined)
        data.name = parsed.data.name;
    if (parsed.data.description !== undefined)
        data.description = parsed.data.description;
    const workspace = await prisma_1.prisma.workspace.update({
        where: { id: workspaceId },
        data,
    });
    return res.status(200).json({ success: true, message: "Workspace updated successfully", data: workspace });
}
async function deleteWorkspace(req, res) {
    const userId = getUserId(req);
    const workspaceId = getWorkspaceId(req);
    const membership = await prisma_1.prisma.workspaceMember.findFirst({ where: { workspaceId: workspaceId, userId: userId } });
    if (!membership || membership.role !== "OWNER") {
        throw (0, http_errors_1.default)(403, "Forbidden");
    }
    await prisma_1.prisma.workspace.delete({ where: { id: workspaceId } });
    return res.status(200).json({ success: true, message: "Workspace deleted successfully" });
}
//# sourceMappingURL=workspace.controller.js.map