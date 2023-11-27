import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

// const notFound = (req: Request, res: Response, next: NextFunction) => {
//   const error = new HttpException(404, "Not Found");
//   next(error);
// };

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler };
