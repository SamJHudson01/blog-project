import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler("Please fill in all fields", 400));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    console.log("User created successfully");
    res.status(201).json({ message: `user ${username} created successfully` });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler("Please fill in all fields", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler("Invalid credentials", 400));
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler("Invalid credentials", 400));
    }
    user.password = undefined;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json(user);
  } catch (error) {
    next(error);
  }
};
