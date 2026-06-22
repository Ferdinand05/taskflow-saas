"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspaceMemberSchema = exports.addWorkspaceMemberSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addWorkspaceMemberSchema = zod_1.default.object({
    userId: zod_1.default.string().uuid(),
    role: zod_1.default.enum(["ADMIN", "MEMBER"]),
});
exports.updateWorkspaceMemberSchema = zod_1.default.object({
    role: zod_1.default.enum(["ADMIN", "MEMBER"]),
});
//# sourceMappingURL=workspaceMember.schema.js.map