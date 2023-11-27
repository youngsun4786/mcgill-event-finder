import { User } from "./user.models";
import { Post } from "./post.models";
import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass(User);
export const PostModel = getModelForClass(Post);
