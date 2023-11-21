import { object, string, TypeOf, nativeEnum, array } from "zod";
import { UserType } from "../user.models";
// ensure that the incoming data is validated and in correct format
export const registerUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).trim(),
    email: string({ required_error: "Email is required" })
      .trim()
      .email("Not a valid email"),
    password: string({ required_error: "Password is required" })
      .trim()
      .min(8, "Password must be at least 8 characters."),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }).trim(),
    role: nativeEnum(UserType, { required_error: "Role is required" }),
    // ! TODO : create a schema for Post and pass it into array parameter
    // pins: array().optional(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>["body"];
