"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspaceMember_controller_1 = require("./workspaceMember.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("/", workspaceMember_controller_1.addWorkspaceMember);
router.get("/", workspaceMember_controller_1.listWorkspaceMembers);
router.patch("/:memberId", workspaceMember_controller_1.updateWorkspaceMember);
router.delete("/:memberId", workspaceMember_controller_1.deleteWorkspaceMember);
exports.default = router;
//# sourceMappingURL=workspaceMember.route.js.map