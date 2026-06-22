import type { ErrorRequestHandler } from "express";
import { HttpError } from "http-errors";
import winston from "winston";

const responseLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "logs/error.log", level: "error" })],
});

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  const httpError = err as HttpError & { errors?: unknown };
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
