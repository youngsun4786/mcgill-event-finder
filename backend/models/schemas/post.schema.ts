import { TypeOf, object, string, nativeEnum, array, date } from "zod";
import { EventStatusType } from "../post.models";

// ensure that the incoming data for creating post is validated and in correct format
const postSchema = {
  body: object({
    email: string({ required_error: "Email is required" })
      .trim()
      .email("Not a valid email"),
    title: string({
      required_error: "Title is required",
    }),
    tags: array(string()).optional(),
    location: string({
      required_error: "Location is required",
    }),
    startDate: date({
      required_error: "Start Date is required",
    }),
    endDate: date({
      required_error: "End Date is required",
    }),
    status: nativeEnum(EventStatusType, {
      required_error: "Event Status is Required",
    }),
    description: string().optional(),
  }),
};

const paramsSchema = {
  params: object({
    postId: string({
      required_error: "postId is required",
    }),
  }),
};

export const createPostSchema = object({
  ...postSchema,
});

export const updatePostSchema = object({
  ...postSchema,
  ...paramsSchema,
});

export const deletePostSchema = object({
  ...paramsSchema,
});

export type PostInput = TypeOf<typeof createPostSchema>["body"];
export type UpdatePostInput = TypeOf<typeof updatePostSchema>["params"];
export type DeletePostInput = TypeOf<typeof deletePostSchema>["params"];
export type PostInformation = Omit<PostInput, "email">;
