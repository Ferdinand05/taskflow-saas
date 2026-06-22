import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.middleware";
import { createWorkspace, deleteWorkspace, getWorkspaceById, listWorkspaces, updateWorkspace } from "./workspace.controller";
import workspaceMemberRoutes from "../workspaceMembers/workspaceMember.route";

const router = Router();

router.use(authenticate);
router.use("/:workspaceId/members", workspaceMemberRoutes);
router.post("/", createWorkspace);
router.get("/", listWorkspaces);
router.get("/:id", getWorkspaceById);
router.patch("/:id", updateWorkspace);
router.delete("/:id", deleteWorkspace);

export default router;
