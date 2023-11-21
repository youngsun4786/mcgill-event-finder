import { object, string, TypeOf, nativeEnum, array, infer } from "zod";
import { Post, EventStatusType } from "../post.models";

export const postSchema = object({
  body: object({}),
});
