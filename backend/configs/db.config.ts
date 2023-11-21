import dotenv from "dotenv";
import mongoose from "mongoose";
import log from "./logger.config";

dotenv.config();

const connectionUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME || "myDbTest";

// exit the process if there is no connection string to MongoDB
if (!connectionUrl) {
  console.error("Missing DB_URL environment variable");
  process.exit(1);
}

// exit the process if there is no database name variable
if (!dbName) {
  console.error("Missing DB_NAME environment variable");
  process.exit(1);
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionUrl);
    log.info("Successfully connected to MongoDB");
  } catch (error: any) {
    log.error(error, "Could not connect to MongoDB");
    process.exit(1);
  }
  // const client: MongoClient = new MongoClient(connectionUrl);
  // await client.connect();

  // // check for connection error
  // client.on("error", console.error.bind(console, "CONNECTION ERROR"));

  // const db: Db = client.db(dbName);
  // check if the collection exists, if not, create it
  //   // Query the collection
  //   const query = { code: { $regex: "^YUL" } }; // Define your query here. An empty query will return all documents.
  //   const result = await collection.find(query).toArray();
  // const result = await collection.find({}).toArray();

  // Print the results
};
