"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspaceSchema = exports.createWorkspaceSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createWorkspaceSchema = zod_1.default.object({
    name: zod_1.default.string().trim().min(3).max(100),
    description: zod_1.default.string().trim().max(255).optional().nullable(),
});
exports.updateWorkspaceSchema = zod_1.default.object({
    name: zod_1.default.string().trim().min(3).max(100).optional(),
    description: zod_1.default.string().trim().max(255).optional().nullable(),
});
//# sourceMappingURL=workspace.schema.js.map