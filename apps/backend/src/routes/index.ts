import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import workspaceRoutes from "../modules/workspaces/workspace.route";
const router = Router();

router.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
export default router;
