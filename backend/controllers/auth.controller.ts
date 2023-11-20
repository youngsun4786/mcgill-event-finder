import { NextFunction, Request, Response } from "express";
import DataInToken, {
  securePassword,
  comparePassword,
  generateToken,
} from "../services/auth.service";
import { Users } from "../models/user.models";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import InvalidCredentialsException from "../exceptions/InvalidCrendentialsException";

// * @desc   Register a new user
// * @route  POST /api/auth/register
// * @access Public
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    // check the database if the user already exists
    const checkUser = await Users.collections!.findOne({ email });

    if (checkUser) {
      throw new UserAlreadyExistsException();
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
      // * create jwt token and cookie session

      generateToken(res, {
        user: {
          _id: newUser.insertedId.toString(),
          name: name,
          email: email,
          role: role,
        },
      } as DataInToken);
      // print token
      res.status(201).json("User created successfully");
      return;
    }
  } catch (error: any) {
    next(error);
  }
};

// * @desc   login the user
// * @route  POST /api/auth/login
// * @access Public
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // check for missing fields
    if (!email || !password) {
      res.status(402);
      throw new Error("All fields are required");
    }

    const user = await Users.collections!.findOne({ email });
    if (!user) throw new UserNotFoundException();
    const validPassword = comparePassword(user.password, password);
    if (!validPassword) throw new InvalidCredentialsException();

    //  create jwt token and cookie session
    generateToken(res, {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    } as DataInToken);
    res.status(201).json("Login successful");
  } catch (error: any) {
    next(error);
  }
};

// * @desc   logout user
// * @route  POST /api/auth/logout
// * @access Public
export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // removing the cookie session
    res.clearCookie("access_token", { httpOnly: true, expires: new Date(0) });
    res.status(201).json("Logout successful");
  } catch (error: any) {
    next(error);
  }
};
