import { PostModel, UserModel } from "../models";
import { PostInformation } from "../models/schemas/post.schema";
import { FilterQuery } from "mongoose";
import { User } from "../models/user.models";

// * @desc   Insert a new post into database
export const createPost = async (email: string, postInfo: PostInformation) => {
  try {
    // first find the user by email
    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) return false;
    // if user exists, create a new post with reference to the user
    const post = await PostModel.create({ author: user.id, ...postInfo });
    return post;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// * @desc   Retrieve all posts in database
export const posts = async () => {
  try {
    const posts = await PostModel.find()
      .populate({ path: "author", select: "-password" })
      .lean()
      .exec();
    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// * @desc   Delete a post by id
export const deletePostById = async (id: string) => {
  try {
    const post = await PostModel.findByIdAndDelete(id).exec();
    return post;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// * @desc Edit/update existing post by id
export const updatePostById = async (id: string) => {};
