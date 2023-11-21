import UserNotFoundException from "../exceptions/UserNotFoundException";
import { User } from "../models/user.models";
import { UserModel } from "../models";
const omit = require("just-omit");
import { comparePassword } from "../utils/jwtCredentials";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";
// create a new user
export const register = async (input: Partial<User>) => {
  try {
    const user = await UserModel.create(input);
    // remove password from user object
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new UserAlreadyExistsException();
  }
};

export const login = async (userEmail: string, userPassword: string) => {
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) return false;

  const validPassword = comparePassword(user.password, userPassword);
  if (!validPassword) return false;
  //r remove password from user object
  return omit(user.toJSON(), "password");
};

// export const logout = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // removing the cookie session
//     res.clearCookie("access_token", { httpOnly: true, expires: new Date(0) });
//     res.status(201).json("Logout successful");
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// };
