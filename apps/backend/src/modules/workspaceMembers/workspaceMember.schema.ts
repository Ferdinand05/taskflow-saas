import z from "zod";

export const addWorkspaceMemberSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["ADMIN", "MEMBER"]),
});

export const updateWorkspaceMemberSchema = z.object({
  role: z.enum(["ADMIN", "MEMBER"]),
});
