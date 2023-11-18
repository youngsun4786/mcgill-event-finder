import { Router } from "express";
import { createUserController } from "../controllers/createUser";
import { getUserController } from "../controllers/getUser";

const router = Router();
router.post("/", createUserController);
router.get("/", getUserController);

export default router;
