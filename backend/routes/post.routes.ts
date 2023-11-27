import { Router } from "express";
import {
  getPostsController,
  createPostController,
} from "../controllers/post.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", isAuthenticated, getPostsController);
router.post("/", isAuthenticated, createPostController);
export default router;
