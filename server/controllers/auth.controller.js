import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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
      throw new Error("All field is required");
    }
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      throw new Error("User is existing");
    }
    console.log("call");
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
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || email === "") {
      throw new Error("All fileds are required !");
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw new Error("User with email not found");
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw new Error("Invalid password!");
    }
    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("auth_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
