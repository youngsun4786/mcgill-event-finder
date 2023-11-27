import { Request, Response, NextFunction, query } from "express";
import { verifyToken } from "../utils/jwtCredentials";
import UnauthorizedInvalidTokenException from "../exceptions/UnauthorizedInvalidTokenException";
import UnauthorizedNoTokenException from "../exceptions/UnauthorizedNoTokenException";

// create a special interface for request with exception of user
export interface RequestWithUser extends Request {
  user?: { _id: string; name: string; email: string; role: string };
}

export const isAuthenticated = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = "";
  // * check if the cookie exists in incoming request
  if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }
  if (!token) {
    return next(new UnauthorizedNoTokenException());
  }
  try {
    const receivedUser = verifyToken(token);
    if (receivedUser) {
      req.user = receivedUser.user;
      next();
    } else {
      return next(new UnauthorizedInvalidTokenException());
    }
  } catch (error: any) {
    // in case of error
    res.clearCookie("access_token");
    return next(new UnauthorizedInvalidTokenException());
  }
};
