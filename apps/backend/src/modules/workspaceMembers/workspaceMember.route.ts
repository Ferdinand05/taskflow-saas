import { Router } from "express";
import { addWorkspaceMember, deleteWorkspaceMember, listWorkspaceMembers, updateWorkspaceMember } from "./workspaceMember.controller";

const router = Router({ mergeParams: true });

router.post("/", addWorkspaceMember);
router.get("/", listWorkspaceMembers);
router.patch("/:memberId", updateWorkspaceMember);
router.delete("/:memberId", deleteWorkspaceMember);

export default router;
