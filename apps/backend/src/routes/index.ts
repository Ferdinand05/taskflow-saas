import { Router } from "express";

const router = Router();

// health check
router.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

export default router;
