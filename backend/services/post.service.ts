import { PostModel, UserModel } from "../models";
import { PostInformation } from "../models/schemas/post.schema";
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
    const posts = await PostModel.find().populate("author").lean().exec();
    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
