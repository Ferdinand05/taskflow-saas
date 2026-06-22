"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use(logger_middleware_1.loggerMiddleware);
app.use("/api", routes_1.default);
app.use(errorHandler_middleware_1.errorHandlerMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map