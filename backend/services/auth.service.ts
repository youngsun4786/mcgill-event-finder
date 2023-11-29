import { User } from "../models/user.models";
import { UserModel } from "../models";
const omit = require("just-omit");
import { comparePassword } from "../utils/jwtCredentials";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";

// * @desc   Register a new user
export const register = async (input: Partial<User>) => {
  try {
    const user = new UserModel(input);
    await user.save();
    // remove password from user object
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new UserAlreadyExistsException();
  }
};

// * @desc   login the user
export const login = async (userEmail: string, userPassword: string) => {
  const user = await UserModel.findOne({ email: userEmail }).exec();
  if (!user) return false;

  const validPassword = await comparePassword(user.password, userPassword);
  if (!validPassword) return false;
  //r remove password from user object
  return omit(user.toJSON(), "password");
};
