import { Request, Response } from "express";
import { Users } from "../models/user.models";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const users = await Users.collections!.find({}).toArray();
    // * destructure the User object and remove the password field
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    res.status(200).send(usersWithoutPassword);
  } catch (error: any) {
    console.error(error);
    res.status(500);
    throw new Error(error.message);
  }
};
