import { genSalt, hashSync, compareSync } from "bcrypt";

export const securePassword = async (password: string) => {
  const salt = await genSalt(10);
  const securedPassword = hashSync(password, salt);
  return securedPassword;
};

export const comparePassword = async (
  hashedPassword: string,
  password: string
) => {
  const isPasswordValid = compareSync(password, hashedPassword);
  return isPasswordValid;
};
