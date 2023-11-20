import { Request, Response } from "express";
import {
  securePassword,
  comparePassword,
  generateToken,
} from "../services/auth.service";
import { Users } from "../models/user.models";

// * @desc   Register a new user
// * @route  POST /api/auth/register
// * @access Public
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // check the database if the user already exists
    const checkUser = await Users.collections!.findOne({ email });

    if (checkUser) {
      res.status(400).json("User already exists");
      throw new Error("User already exists");
      return;
    }
    // create a new user
    const newUser = await Users.collections!.insertOne({
      name,
      email,
      password: await securePassword(password),
      role,
      pins: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (newUser.acknowledged) {
      // generate jwt token
      generateToken(res, { id: newUser.insertedId });
      res.status(201).json("User created successfully");
      return;
    } else {
      res.status(400);
      throw new Error("Unable to create user");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// * @desc   login the user
// * @route  POST /api/auth/login
// * @access Public
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check for missing fields
    if (!email || !password) {
      res.status(402);
      throw new Error("All fields are required");
    }

    const user = await Users.collections!.findOne({ email });

    // check if the user exists
    if (user && comparePassword(user.password, password)) {
      res.status(201).json({
        message: "Login successful",
        success: true,
        content: { _id: user._id, name: user.name, email: user.email },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    // generate jwt token
    generateToken(res, { id: user!._id });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// * @desc   logout user
// * @route  POST /api/auth/logout
// * @access Public
export const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, expires: new Date(0) });
    res.status(200).json("Logout successful");
  } catch (error: any) {
    console.error(error);
    res.status(500);
    throw new Error("Unable to logout");
  }
};
