import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const updateUser = async (req, res, next) => {
  try {
    const { username, avatar, email } = req.body;
    console.log(req.user);
    if (req.user._id.toString() !== req.params.userId) {
      throw new Error("You are not allowed to updated this user");
    }
    if (
      username &&
      (username.length < 6 || username.length > 30 || username.includes(" "))
    ) {
      throw new Error(
        "Username must be between from 7 to 30 characters and can not contain space"
      );
    }

    // Xây dựng đối tượng $set chỉ chứa các trường dữ liệu cần cập nhật nếu chúng khác với dữ liệu hiện tại
    const $set = {};
    if (username && username !== req.user.username) {
      $set.username = username;
    }
    if (avatar && avatar !== req.user.avatar) {
      $set.avatar = avatar;
    }
    if (email && email !== req.user.email) {
      $set.email = email;
    }

    // Chỉ cập nhật nếu có trường dữ liệu cần cập nhật
    if (Object.keys($set).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set },
        { new: true }
      );
      const { password: pass, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } else {
      // Không cần cập nhật, trả về dữ liệu hiện tại của người dùng
      res.status(200).json(req.user);
    }
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params;
    if (req.user._id !== userId) {
      throw new Error("You are not allowed to delete this user");
    }
    await User.findById(userIds);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
