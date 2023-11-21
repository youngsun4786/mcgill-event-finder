// import { ObjectId, Db, MongoServerError, Collection } from "mongodb";
import {
  pre,
  modelOptions,
  Severity,
  getModelForClass,
  prop,
  Ref,
  index,
} from "@typegoose/typegoose";

import { securePassword, comparePassword } from "../utils/jwtCredentials";
import { Post } from "./post.models";

// export type User = {
//   _id?: ObjectId;
//   name: string;
//   email: string;
//   password: string;
//   role: "student" | "professor" | "admin" | "staff";
//   pins: Post[] | undefined;
//   createdAt?: Date;
//   updatedAt?: Date;
// };

export enum UserType {
  STUDENT = "student",
  PROFESSOR = "professor",
  STAFF = "staff",
}
@index({ email: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    collection: "User",
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
// middleware
@pre<User>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) next();
  const hashedPassword = await securePassword(user.password);
  user.password = hashedPassword;
  return;
})
export class User {
  @prop({ required: true })
  name: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ required: true, type: String, enum: UserType })
  role: UserType;

  @prop({ ref: () => Post, default: [] })
  pins?: Ref<Post>[];
}

// // validation to the user collection
// export async function applyUserSchemaValidation(db: Db) {
//   // Try applying the modification to the collection, if the collection doesn't exist, create it
//   await db
//     .command({
//       collMod: "User",
//       validator: jsonSchema,
//     })
//     .catch(async (error: MongoServerError) => {
//       if (error.codeName === "NamespaceNotFound") {
//         await db.createCollection("User", { validator: jsonSchema });
//       } else {
//         console.error(error.errInfo);
//         console.error(error.cause);
//         console.error(error.message);
//       }
//     });
// }

// export const Users: {
//   collections?: Collection<User>;
// } = {};
