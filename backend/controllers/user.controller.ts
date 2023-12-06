import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";
import { UpdateUserPinsInput } from "../models/schemas/user.schema";
import { updateUserPins } from "../services/user.service";

export const getUserController = async (req: Request, res: Response) => {
  try {
    // * exclude the password field
    const users = await UserModel.find().select({ password: 0 }).exec();
    // const usersWithoutPassword = users.map((user) => {
    //   const body = {
    //     user_id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   };
    //   return body;
    // //   console.log(body);
    //   //   const { password, ...rest } = user;
    //   //   return rest;
    // });
    console.log(users);
    res.status(200).send(users);
  } catch (error: any) {
    console.error(error);
    res.status(500);
    throw new Error(error.message);
  }
};

// * @desc   Update users pins array
// * @route  PUT /users
// * @access Private
export const updateUserPinsController = async (
  req: Request<{}, {}, UpdateUserPinsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, pins } = req.body;
    const updated = await updateUserPins(email, pins);
    if (updated) {
      res.status(200).json("User pins array updated successfully");
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    next(error);
  }
};
