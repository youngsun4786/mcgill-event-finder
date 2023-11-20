import { ObjectId, Db, MongoServerError, Collection } from "mongodb";
import { jsonSchema } from "./validators/user.validator";
import { Post } from "./post.models";

export type User = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "student" | "professor" | "admin" | "staff";
  pins: Post[] | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};

// validation to the user collection
export async function applyUserSchemaValidation(db: Db) {
  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: "User",
      validator: jsonSchema,
    })
    .catch(async (error: MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("User", { validator: jsonSchema });
      } else {
        console.error(error.errInfo);
        console.error(error.cause);
        console.error(error.message);
      }
    });
}

export const Users: {
  collections?: Collection<User>;
} = {};
