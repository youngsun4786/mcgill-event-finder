import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
