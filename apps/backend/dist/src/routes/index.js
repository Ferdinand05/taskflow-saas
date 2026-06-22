"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const workspace_route_1 = __importDefault(require("../modules/workspaces/workspace.route"));
const router = (0, express_1.Router)();
router.get("/health", (_, res) => {
    res.json({
        success: true,
        message: "API Running",
    });
});
router.use("/auth", auth_route_1.default);
router.use("/workspaces", workspace_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map