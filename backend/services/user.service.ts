import { UserModel } from "../models";

// * @desc  update users' post pins array
export const updateUserPins = async (userEmail: string, pins: string[]) => {
  const user = await UserModel.findOneAndUpdate(
    { email: userEmail },
    { pins: pins }
  ).exec();
  if (!user) return false;
  return true;
};
