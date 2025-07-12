//import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};
