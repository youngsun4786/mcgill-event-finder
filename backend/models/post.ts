import { User } from "./user";
import { ObjectId } from "mongodb";

export type Post = {
  _id?: ObjectId;
  author: User;
  eventName: string;
  tags: string[];
  location: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  status: "scheduled" | "ongoing" | "cancelled" | "delayed";
  description: string;
};

// validation to the post collection
