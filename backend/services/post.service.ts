import { PostModel } from "../models";

export const posts = async () => {
  try {
    const posts = await PostModel.find().exec();
    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
