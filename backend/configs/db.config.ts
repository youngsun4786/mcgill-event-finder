import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();

export const connectToDatabase = async () => {
  const connectionUrl = process.env.DB_URL;
  const dbName = "mydbTest" || process.env.DB_NAME;

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

  // Get the collection
  const collection = db.collection("cities"); // Replace with your collection name

  // Query the collection
//   const query = { code: { $regex: "^YUL" } }; // Define your query here. An empty query will return all documents.
//   const result = await collection.find(query).toArray();
    const result = await collection.find().limit(5).toArray();

  // Print the results
  console.log(result);
};
