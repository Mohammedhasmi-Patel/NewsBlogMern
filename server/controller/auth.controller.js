import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const isUsernameTaken = existingUser.username == username;
      const isEmailTaken = existingUser.email == email;

      if (isUsernameTaken) {
        return next(errorHandler(400, "Username is already taken."));
      }

      if (isEmailTaken) {
        return next(errorHandler(400, "Email is already registered."));
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    return next(errorHandler(500, "Internal server error during signup"));
  }
};
