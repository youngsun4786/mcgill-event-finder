import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/auth.controller";
import validatorResource from "../middlewares/schema.validator";
import {
  registerUserSchema,
  loginUserSchema,
} from "../models/schemas/user.schema";
const router = Router();

router.post(
  "/register",
  validatorResource(registerUserSchema),
  registerController
);
router.post("/login", validatorResource(loginUserSchema), loginController);
router.post("/logout", logoutController);
export default router;
