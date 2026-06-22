import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().trim().min(3).max(100),
  email: z.email(),
  password: z.string().min(8).max(72),
});
