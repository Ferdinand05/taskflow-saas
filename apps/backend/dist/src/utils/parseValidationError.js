"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValidationError = parseValidationError;
const zod_1 = __importDefault(require("zod"));
function parseValidationError(error) {
    return zod_1.default.treeifyError(error);
}
//# sourceMappingURL=parseValidationError.js.map