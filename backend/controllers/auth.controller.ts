import { NextFunction, Request, Response } from "express";
import DataInToken, { generateToken } from "../utils/jwtCredentials";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";
import InvalidCredentialsException from "../exceptions/InvalidCrendentialsException";
import {
  RegisterUserInput,
  LoginUserInput,
} from "../models/schemas/user.schema";
import { register, login } from "../services/auth.service";

// * @desc   Register a new user
// * @route  POST /api/auth/register
// * @access Public
export const registerController = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    // create a new user
    const newUser = await register(body);
    console.log(newUser);
    if (newUser) {
      // // * create jwt token and cookie session

      // generateToken(res, {
      //   user: {
      //     _id: newUser._id.toString(),
      //     name: newUser.name,
      //     email: newUser.email,
      //     role: newUser.role,
      //   },
      // } as DataInToken);
      // print token
      res.status(201).json("User created successfully");
      return;
    }
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new UserAlreadyExistsException());
    }
    res.status(500).json(error.message);
    return next(error);
  }
};

// * @desc   login the user
// * @route  POST /api/auth/login
// * @access Public
export const loginController = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await login(email, password);
    if (!user) {
      res.status(401).json("Invalid credentials");
      next(new InvalidCredentialsException());
    }
    //  create session token and cookie
    generateToken(res, {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    } as DataInToken);

    //  create refresh session token
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
    next();
  } catch (error: any) {
    next(error);
  }
};
