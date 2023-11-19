import { Request, Response } from "express";
import { securePassword, comparePassword } from "../utils/encrypt";
import { collections } from "../configs/db.config";

// * @desc   Register a new user
// * @route  POST /api/auth/register
// * @access Public
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // check the database if the user already exists
    const checkUser = await collections.users!.findOne({ email });
    checkUser && res.status(400).json("User already exists");

    // create a new user
    const newUser = await collections.users!.insertOne({
      name,
      email,
      password: await securePassword(password),
      role,
      pins: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (newUser.acknowledged) {
      res.status(201).json("User created successfully");
      return;
    } else {
      res.status(400).json("Unable to create user");
      return;
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// * @desc   login the user
// * @route  POST /api/auth/login
// * @access Public
export const loginController = async (req: Request, res: Response) => {};
