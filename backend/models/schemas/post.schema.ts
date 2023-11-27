import { TypeOf, object, string, nativeEnum, array, date } from "zod";
import { EventStatusType } from "../post.models";
import { registerUserSchema } from "./user.schema";

export const postSchema = object({
  body: object({
    author: registerUserSchema!,
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
});

export type PostInput = TypeOf<typeof postSchema>["body"];
