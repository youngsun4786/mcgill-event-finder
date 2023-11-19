import { Router } from "express";
import { createUserController, getUserController } from "../controllers/user.controller";

const router = Router();
router.post("/", createUserController);
router.get("/", getUserController);

export default router;
