import { Request, Response, NextFunction, query } from "express";
import { verifyToken } from "../utils/jwtCredentials";
import UnauthorizedInvalidTokenException from "../exceptions/UnauthorizedInvalidTokenException";
import UnauthorizedNoTokenException from "../exceptions/UnauthorizedNoTokenException";
import log from "../configs/logger.config";

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
  // * check if the token exists in incoming request session

  if (req.session) token = req.session["token"];

  if (!token) {
    return next(new UnauthorizedNoTokenException());
  }
  try {
    const receivedUser = verifyToken(token);
    // log.info(
    //   `Session authenticated after login\n Session: ${req.session}\n User data: ${receivedUser}`
    // );
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
