import { Router } from "express";
import {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
} from "../controllers/post.controller";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "../models/schemas/post.schema";
import { isAuthenticated } from "../middlewares/auth.middleware";
import validatorResource from "../middlewares/schema.validator";

const router = Router();
router.get("/", isAuthenticated, getPostsController);
router.post(
  "/",
  [isAuthenticated, validatorResource(createPostSchema)],
  createPostController
);
router.delete(
  "/:postId",
  [isAuthenticated, validatorResource(deletePostSchema)],
  deletePostController
);
router.put(
  "/:postId",
  [isAuthenticated, validatorResource(updatePostSchema)],
  updatePostController
);
export default router;
