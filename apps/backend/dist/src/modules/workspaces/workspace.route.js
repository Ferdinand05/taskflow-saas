"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("../../middlewares/authenticate.middleware");
const workspace_controller_1 = require("./workspace.controller");
const workspaceMember_route_1 = __importDefault(require("../workspaceMembers/workspaceMember.route"));
const router = (0, express_1.Router)();
router.use(authenticate_middleware_1.authenticate);
router.use("/:workspaceId/members", workspaceMember_route_1.default);
router.post("/", workspace_controller_1.createWorkspace);
router.get("/", workspace_controller_1.listWorkspaces);
router.get("/:id", workspace_controller_1.getWorkspaceById);
router.patch("/:id", workspace_controller_1.updateWorkspace);
router.delete("/:id", workspace_controller_1.deleteWorkspace);
exports.default = router;
//# sourceMappingURL=workspace.route.js.map