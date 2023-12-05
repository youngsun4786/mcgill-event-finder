import { Response } from "express";
import { genSalt, hashSync, compareSync } from "bcrypt";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import log from "../configs/logger.config";

dotenv.config();

export default interface DataInToken extends JwtPayload {
  user?: { _id: string; name: string; email: string; role: string; pins: string[] };
}

// environment variables
const jwtEnv = process.env.JWT_SECRET;
const jwtRefreshEnv = process.env.REFRESH_JWT_SECRET;
// exit the process if there is no jwt secret string
if (!jwtEnv) {
  console.error("Missing JWT_SECRET environment variable");
  process.exit(1);
}
// exit the process if there is no jwt refresh secret string
if (!jwtRefreshEnv) {
  console.error("Missing JWT_REFRESH_SECRET environment variable");
  process.exit(1);
}

export const securePassword = async (password: string) => {
  const salt = await genSalt(10);
  const securedPassword = hashSync(password, salt);
  return securedPassword;
};

export const comparePassword = async (
  hashedPassword: string,
  password: string
) => {
  try {
    return compareSync(password, hashedPassword);
  } catch (error: any) {
    log.error(error, "Could not validate password");
    return false;
  }
};

export const generateToken = (res: Response, payload: DataInToken) => {
  const token = jwt.sign(payload, jwtEnv, {
    expiresIn: "1h",
    allowInsecureKeySizes: true,
    algorithm: "HS256",
  });

  return token;
};

export const generateRefreshToken = (res: Response, payload: DataInToken) => {
  const token = jwt.sign(payload, jwtRefreshEnv, {
    expiresIn: "1d",
    allowInsecureKeySizes: true,
    algorithm: "HS256",
  });
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtEnv) as DataInToken;
};
