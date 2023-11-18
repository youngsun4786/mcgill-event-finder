import { Request, Response } from "express";
import { collections } from "../configs/db.config";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const users = await collections.users!.find({}).toArray();
    res.status(200).send(users);

    console.log(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
