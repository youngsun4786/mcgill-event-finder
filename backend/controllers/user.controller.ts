import { Request, Response } from "express";
import { Users } from "../models/user.models";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const users = await Users.collections!.find({}).toArray();
    res.status(200).send(users);
  } catch (error: any) {
    console.error(error);
    res.status(500);
    throw new Error(error.message);
  }
};
