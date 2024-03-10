import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const updateUser = async (req, res, next) => {
  try {
    const { password, username, avatar, email } = req.body;
    if (req.user.id !== req.params.userId) {
      throw new Error("You are not allowed to updated this user");
    }
    if (password) {
      if (password < 6) {
        throw new Error("Password must be at least 6 charactiers");
      }
    }
    if (username) {
      if (username.length < 6 || username.length > 30) {
        throw new Error("Username must be between from 7 to 30 characters");
      }
      if (username.includes(" ")) {
        throw new Error("Username can not contain space");
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username,
          avatar,
          email,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
