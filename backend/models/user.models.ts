import { ObjectId, Db, MongoServerError } from "mongodb";
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
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      title: "User Object Validation",
      required: ["name", "email", "password", "role"],
      additionalProperties: true,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
          minLength: 2,
          maxLength: 32,
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "'email' is required and is a string",
          minLength: 4,
          maxLength: 50,
        },
        password: {
          bsonType: "string",
          description: "'password' is required and is a string",
          minLength: 3,
        },
        role: {
          enum: ["student", "professor", "admin", "staff"],
          description: "'role' of the user that must be selected",
        },
        pins: {
          bsonType: ["array"],
          minItems: 0,
          description: "'pins' is an array of posts",
          items: {
            bsonType: ["object"],
          },
        },
        createdAt: {
          bsonType: "date",
          description: "'createdAt' is a date",
        },
        updatedAt: {
          bsonType: "date",
          description: "'updatedAt' is a date",
        },
      },
    },
  };

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
