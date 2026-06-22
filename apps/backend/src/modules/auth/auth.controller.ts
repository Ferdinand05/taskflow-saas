import { Request, Response } from "express";
import z from "zod";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { env } from "../../config/env";
import { loginSchema, registerSchema } from "./auth.schema";
import { signAccessToken, signRefreshToken } from "./auth.utils";
import { parseValidationError } from "@/utils/parseValidationError";

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw createHttpError(401, "Invalid email or password");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw createHttpError(401, "Invalid email or password");
  }
  const payload = { sub: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
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

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }
  const { name, email, password } = parsed.data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw createHttpError(409, "Email already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
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
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.refreshToken.create({
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

export async function refresh(req: Request, res: Response) {
  const parsed = z.object({ refreshToken: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }

  const { refreshToken } = parsed.data;
  const storedToken = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });

  if (!storedToken || storedToken.expiresAt <= new Date()) {
    throw createHttpError(401, "Invalid refresh token");
  }

  let payload: { sub: string; email: string };
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { sub: string; email: string };
  } catch {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    throw createHttpError(401, "Invalid refresh token");
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    throw createHttpError(401, "Invalid refresh token");
  }

  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });

  const nextPayload = { sub: user.id, email: user.email };
  const newAccessToken = signAccessToken(nextPayload);
  const newRefreshToken = signRefreshToken(nextPayload);

  await prisma.refreshToken.create({
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

export async function logout(req: Request, res: Response) {
  const parsed = z.object({ refreshToken: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) {
    throw createHttpError(400, "Validation error", { errors: parseValidationError(parsed.error) });
  }

  const logout = await prisma.refreshToken.deleteMany({ where: { token: parsed.data.refreshToken } });

  if (logout.count == 0) throw createHttpError.Unauthorized("User already logout");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
}
