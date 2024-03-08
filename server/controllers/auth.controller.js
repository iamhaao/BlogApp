import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields is required"));
    }
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      next(errorHandler(400, "User is existing"));
    }
    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      password: hashPassword,
      email,
    });

    await newUser.save();
    res.status(200).json("Signup successfull");
  } catch (error) {
    next(error);
  }
};
