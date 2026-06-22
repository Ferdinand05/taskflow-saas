import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(3).max(100),
  description: z.string().trim().max(255).optional().nullable(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().trim().min(3).max(100).optional(),
  description: z.string().trim().max(255).optional().nullable(),
});
