import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import validatorResource from "../middlewares/schema.validator";
import { updateUserPinsSchema } from "../models/schemas/user.schema";
import { updateUserPinsController } from "../controllers/user.controller";
const router = Router();
// router.get("/", [isAuthenticated], getUserController);

router.put(
  "/",
  [isAuthenticated, validatorResource(updateUserPinsSchema)],
  updateUserPinsController
);

export default router;
