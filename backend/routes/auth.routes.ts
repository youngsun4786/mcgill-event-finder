import { Router } from "express";
import { registerController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);

export default router;
