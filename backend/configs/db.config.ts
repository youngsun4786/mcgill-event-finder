import debug from "debug";
import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";
import { User, applyUserSchemaValidation, Users } from "../models/user.models";

const log = debug("backend:db");

dotenv.config();

const connectionUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME || "myDbTest";

// exit the process if there is no connection string to MongoDB
if (!connectionUrl) {
  log("Missing DB_URL environment variable");
  process.exit(1);
}

// exit the process if there is no database name variable
if (!dbName) {
  log("Missing DB_NAME environment variable");
  process.exit(1);
}

export const connectToDatabase = async () => {
  const client: MongoClient = new MongoClient(connectionUrl);
  await client.connect();

  // check for connection error
  client.on("error", console.error.bind(console, "CONNECTION ERROR"));
  client.once("open", () =>
    console.log("Successfully connected to MongoDB database")
  );

  const db: Db = client.db(dbName);
  // check if the collection exists, if not, create it
  await applyUserSchemaValidation(db);

  // Get the collection
  Users.collections = db.collection<User>("User");
  //   // Query the collection
  //   const query = { code: { $regex: "^YUL" } }; // Define your query here. An empty query will return all documents.
  //   const result = await collection.find(query).toArray();
  // const result = await collection.find({}).toArray();

  // Print the results
};
