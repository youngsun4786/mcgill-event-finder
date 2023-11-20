import { Response } from "express";
import { genSalt, hashSync, compareSync } from "bcrypt";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

// environment variables
const jwtEnv = process.env.JWT_SECRET;
// exit the process if there is no jwt secret string
if (!jwtEnv) {
  console.error("Missing JWT_SECRET environment variable");
  process.exit(1);
}

export const securePassword = async (password: string) => {
  const salt = await genSalt(10);
  const securedPassword = hashSync(password, salt);
  return securedPassword;
};

export const comparePassword = (hashedPassword: string, password: string) => {
  const isPasswordValid = compareSync(password, hashedPassword);
  return isPasswordValid;
};

export const generateToken = (res: Response, payload: JwtPayload) => {
  const token = jwt.sign(payload, jwtEnv, {
    expiresIn: "1hr",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "environment",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtEnv);
};
