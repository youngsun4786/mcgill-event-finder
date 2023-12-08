import { Request, Response, NextFunction } from "express";
import { posts } from "../services/post.service";
import {
  PostInput,
  DeletePostInput,
  UpdatePostInput,
  PostInformation,
} from "../models/schemas/post.schema";
import {
  createPost,
  deletePostById,
  updatePostById,
  findPostById,
} from "../services/post.service";

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

// * @desc   Retrieve a single post by id and update its content
// * @route  PUT /posts/:postId
// * @access Private
export const updatePostController = async (
  req: Request<UpdatePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const { email, ...updatedPostInfo } = req.body;
    const post = await findPostById(postId);

    if (!post) {
      res.status(404).json("Post not found");
      return;
    }

    const updatedPost = await updatePostById(postId, updatedPostInfo);
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(500).json(error.message);
    next(error);
  }
};

// * @desc   Delete a post in database
// * @route  DELETE /posts/:postId
// * @access Private
export const deletePostController = async (
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;
    const post = await findPostById(postId);

    if (!post) {
      res.status(404).json("Post not found");
      return;
    }

    await deletePostById(postId);
    res.status(200).json("Post deleted successfully");
  } catch (error: any) {
    res.status(500).json(error.message);
    next(error);
  }
};
