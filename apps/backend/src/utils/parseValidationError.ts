import z from "zod";

export function parseValidationError(error: z.ZodError) {
  return z.treeifyError(error);
}
