import { Request, Response, NextFunction, query } from "express";
import { ObjectId } from "mongodb";
import { verifyToken } from "../services/auth.service";
import { Users, User } from "../models/user.models";

// create a special interface for request with exception of user
export interface RequestWithUser extends Request {
  user: User;
}

export const isAuthenticated = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  if (cookies && cookies.jwt) {
    const decoded = verifyToken(cookies.jwt);
    // * convert the string back to ObjectId type
    const q_id = new ObjectId(decoded._id);
    console.log(q_id);
    const user = await Users.collections!.findOne({ _id: q_id });

    if (user) {
      req.user = user;
      return next();
    }
    try {
    } catch (error: any) {
      res.status(401);
      next(Error("Unauthorized, invalid token"));
    }
  } else {
    res.status(401);
    next(Error("Unauthorized, no token"));
  }
};

export default isAuthenticated;
