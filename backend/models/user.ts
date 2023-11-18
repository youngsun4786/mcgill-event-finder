import { ObjectId, Db, MongoServerError } from "mongodb";
import { Post } from "./post";

export type User = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  pins: Post[];
};

// validation to the user collection
export async function applyUserSchemaValidation(db: Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password"],
      additionalProperties: false,
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
          description: "'email' is required and is a string",
          minLength: 4,
          maxLength: 50,
        },
        password: {
          bsonType: "string",
          description: "'password' is required and is and is a string",
          minLength: 3,
          maxLength: 32,
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: "users",
      validator: jsonSchema,
    })
    .catch(async (error: MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("users", { validator: jsonSchema });
      }
    });
}
