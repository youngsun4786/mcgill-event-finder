import { User } from "./user.models";
import { ObjectId, Db, MongoServerError } from "mongodb";

export type Post = {
  _id?: ObjectId;
  author: User;
  title: string;
  tags: string[];
  location: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: "scheduled" | "ongoing" | "cancelled" | "delayed";
  description: string;
};

// validation to the post collection
export async function applyPostSchemaValidation(db: Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["author", "title", "location", "createdAt"],
      properties: {
        _id: {
          type: "string",
          description: "unique UUID of the user",
        },
        author: {
          bsonType: "object",
          description: "'author' is required and is a User Object",
        },
        title: {
          bsonType: "string",
          description: "'title' is required and is a string",
          maxLength: 100,
        },
        location: {
          bsonType: "string",
          description: "'location' is required and is a string",
        },
        createdAt: {
          bsonType: "date",
          description: "'createdAt' is required and is a date",
          default: Date.now(),
        },
        startDate: {
          bsonType: "date",
        },
        endDate: {
          bsonType: "date",
        },
        status: {
          bsonType: "string",
          description:
            "Must be either scheduled, ongoing, cancelled, or delayed",
        },
        description: {
          bsonType: "string",
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: "Post",
      validator: jsonSchema,
    })
    .catch(async (error: MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("Post", { validator: jsonSchema });
      }
    });
}
