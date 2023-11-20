import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

const isError = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ success: false, status, message });
};

export default isError;
