import { Request, Response, NextFunction } from "express";
import { posts } from "../services/post.service";
import { PostInput } from "../models/schemas/post.schema";
import { createPost, deletePostById } from "../services/post.service";

import util from "util";

// * @desc   Create a new post
// * @route  POST /posts
// * @access Private
export const createPostController = async (
  req: Request<{}, {}, PostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, ...postInfo } = req.body;
    const newPost = await createPost(email, postInfo);
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(500).json(error.message);
    next(error);
  }
};

// * @desc   Retrieve all posts in database
// * @route  GET /posts
// * @access Private
export const getPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await posts();
    res.status(200).json(allPosts);
  } catch (error: any) {
    res.status(500).json(error.message);
    next(error);
  }
};

// * @desc   Delete a post in database
// * @route  DELETE /posts/:id
// * @access Private
export const deletePostController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const deletedPost = await deletePostById(id);
    res.status(200).json(deletedPost);
  } catch (error: any) {
    res.status(500).json(error.message);
    next(error);
  }
};
