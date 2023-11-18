import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient, Db, Collection, MongoServerError } from "mongodb";
import { User } from "../models/users/user";

dotenv.config();

export const collections: {
  users?: Collection<User>;
} = {};

export const connectToDatabase = async () => {
  const connectionUrl = process.env.DB_URL;
  const dbName = process.env.DB_NAME || "mydbTest";

  // exit the process if there is no connection string to MongoDB
  if (!connectionUrl) {
    console.error("Missing DB_URL environment variable");
    process.exit(1);
  }

  const client: MongoClient = new MongoClient(connectionUrl);
  await client.connect();

  // check for connection error
  client.on("error", console.error.bind(console, "CONNECTION ERROR"));
  client.once("open", () =>
    console.log("Successfully connected to MongoDB database")
  );

  // exit the process if there is no database name variable
  if (!dbName) {
    console.error("Missing DB_NAME environment variable");
    process.exit(1);
  }

  const db: Db = client.db(dbName);
  await applySchemaValidation(db);

  // Get the collection
  const usersCollection = db.collection<User>("users");
  collections.users = usersCollection;

  //   const collection = db.collection("cities"); // Replace with your collection name

  //   // Query the collection
  //   const query = { code: { $regex: "^YUL" } }; // Define your query here. An empty query will return all documents.
  //   const result = await collection.find(query).toArray();
  // const result = await collection.find({}).toArray();

  // Print the results
};

async function applySchemaValidation(db: Db) {
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
