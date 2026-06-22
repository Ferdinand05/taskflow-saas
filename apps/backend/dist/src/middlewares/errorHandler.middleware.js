"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const winston_1 = __importDefault(require("winston"));
const responseLogger = winston_1.default.createLogger({
    level: "error",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
    transports: [new winston_1.default.transports.Console(), new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" })],
});
const errorHandlerMiddleware = (err, req, res, _next) => {
    const httpError = err;
    const statusCode = typeof httpError.statusCode === "number" ? httpError.statusCode : typeof httpError.status === "number" ? httpError.status : 500;
    const message = err instanceof Error ? err.message : "Internal Server Error";
    const errors = statusCode < 500 ? httpError.errors : undefined;
    responseLogger.error("HTTP request failed", {
        method: req.method,
        url: req.originalUrl,
        statusCode,
        message,
        errors,
        stack: err instanceof Error ? err.stack : undefined,
    });
    res.status(statusCode).json({
        success: false,
        message: statusCode >= 500 ? "Internal Server Error" : message,
        ...(errors ? { errors } : {}),
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.middleware.js.map