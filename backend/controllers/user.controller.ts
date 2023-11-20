import { Request, Response } from "express";
import { Users } from "../models/user.models";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await Users.collections!.insertOne(user);

    if (result.acknowledged) {
      res.status(200).send({ message: "User created successfully" });
    } else {
      res.status(500).send("Failed to create a new user.");
    }

    console.log(result);
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const users = await Users.collections!.find({}).toArray();
    res.status(200).send(users);

    console.log(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
