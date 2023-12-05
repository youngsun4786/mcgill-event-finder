import { NextFunction, Request, Response } from "express";
import DataInToken, {
  generateRefreshToken,
  generateToken,
} from "../utils/jwtCredentials";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";
import InvalidCredentialsException from "../exceptions/InvalidCrendentialsException";
import {
  RegisterUserInput,
  LoginUserInput,
} from "../models/schemas/user.schema";
import { register, login } from "../services/auth.service";

// * @desc   Register a new user
// * @route  POST /auth/register
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
      res.status(201).json({ message: "User created successfully" });
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
// * @route  POST /auth/login
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
      next(new InvalidCredentialsException());
    }
    //  create session token and cookie
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      pins: user.pins,
  } as DataInToken;
    const token = generateToken(res, { user: userData } as DataInToken);

    if (req.session) req.session.token = token;
    res.send({
      accessToken: token,
      user: userData,
    });
    res.status(200);
  } catch (error: any) {
    next(error);
  }
};

// * @desc   logout user
// * @route  POST /auth/logout
// * @access Public
export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // removing the cookie session
    // if (req.session) req.session.token = null;

    res.clearCookie("token", { httpOnly: true, expires: new Date(0) });
    res.status(201).json({ message: "Logout successful" });
    next();
  } catch (error: any) {
    next(error);
  }
};
