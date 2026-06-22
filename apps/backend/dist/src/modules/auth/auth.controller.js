"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
exports.refresh = refresh;
exports.logout = logout;
const zod_1 = __importDefault(require("zod"));
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../config/prisma");
const env_1 = require("../../config/env");
const auth_schema_1 = require("./auth.schema");
const auth_utils_1 = require("./auth.utils");
const parseValidationError_1 = require("@/utils/parseValidationError");
async function login(req, res) {
    const parsed = auth_schema_1.loginSchema.safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const { email, password } = parsed.data;
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw (0, http_errors_1.default)(401, "Invalid email or password");
    }
    const isMatched = await bcrypt_1.default.compare(password, user.password);
    if (!isMatched) {
        throw (0, http_errors_1.default)(401, "Invalid email or password");
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = (0, auth_utils_1.signAccessToken)(payload);
    const refreshToken = (0, auth_utils_1.signRefreshToken)(payload);
    await prisma_1.prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
            accessToken,
            refreshToken,
        },
    });
}
async function register(req, res) {
    const parsed = auth_schema_1.registerSchema.safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const { name, email, password } = parsed.data;
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw (0, http_errors_1.default)(409, "Email already registered");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const payload = { sub: user.id, email: user.email };
    const accessToken = (0, auth_utils_1.signAccessToken)(payload);
    const refreshToken = (0, auth_utils_1.signRefreshToken)(payload);
    await prisma_1.prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
            user,
            accessToken,
            refreshToken,
        },
    });
}
async function refresh(req, res) {
    const parsed = zod_1.default.object({ refreshToken: zod_1.default.string().min(1) }).safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const { refreshToken } = parsed.data;
    const storedToken = await prisma_1.prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!storedToken || storedToken.expiresAt <= new Date()) {
        throw (0, http_errors_1.default)(401, "Invalid refresh token");
    }
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(refreshToken, env_1.env.JWT_REFRESH_SECRET);
    }
    catch {
        await prisma_1.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
        throw (0, http_errors_1.default)(401, "Invalid refresh token");
    }
    const user = await prisma_1.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
        await prisma_1.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
        throw (0, http_errors_1.default)(401, "Invalid refresh token");
    }
    await prisma_1.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    const nextPayload = { sub: user.id, email: user.email };
    const newAccessToken = (0, auth_utils_1.signAccessToken)(nextPayload);
    const newRefreshToken = (0, auth_utils_1.signRefreshToken)(nextPayload);
    await prisma_1.prisma.refreshToken.create({
        data: {
            token: newRefreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    return res.status(200).json({
        success: true,
        message: "Token refreshed",
        data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        },
    });
}
async function logout(req, res) {
    const parsed = zod_1.default.object({ refreshToken: zod_1.default.string().min(1) }).safeParse(req.body);
    if (!parsed.success) {
        throw (0, http_errors_1.default)(400, "Validation error", { errors: (0, parseValidationError_1.parseValidationError)(parsed.error) });
    }
    const logout = await prisma_1.prisma.refreshToken.deleteMany({ where: { token: parsed.data.refreshToken } });
    if (logout.count == 0)
        throw http_errors_1.default.Unauthorized("User already logout");
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}
//# sourceMappingURL=auth.controller.js.map