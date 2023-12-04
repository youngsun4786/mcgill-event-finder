import { Router } from "express";
import { getUserController } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", [isAuthenticated], getUserController);

export default router;
