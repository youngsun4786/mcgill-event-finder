import { object, string, TypeOf, array } from "zod";

// ensure that the incoming data for login is validated and in correct format
export const updateUserPinsSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    })
      .trim()
      .email("Invalid email or password"),
    pins: array(
      string({
        required_error: "post id is required",
      })
    ),
  }),
});

export type UpdateUserPinsInput = TypeOf<typeof updateUserPinsSchema>["body"];
