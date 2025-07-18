import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import generateAuthToken from "../utils/generateAuthToken.js";
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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "Email and password are required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    // generate token for the user

    const token = generateAuthToken(user._id, process.env.JWT_SECRET);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Signin successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
  } catch (error) {
    console.error("Signin error:", error);
    return next(errorHandler(500, "Internal server error during signin"));
  }
};

export const googleauth = async (req, res, next) => {
  try {
    const { email, name, profilePhotoUrl } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      generateAuthToken(user._id, process.env.JWT_SECRET);
      return res
        .status(200)
        .cookie("token", user.token, {
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Google auth successful",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            profilePhotoUrl: user.profilePhotoUrl,
          },
        });
    }

    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
    const createdUser = await User.create({
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(36).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: profilePhotoUrl || "",
    });

    const token = generateAuthToken(createdUser._id, process.env.JWT_SECRET);

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Google auth successful",
        user: {
          id: createdUser._id,
          username: createdUser.username,
          email: createdUser.email,
          profilePicture: profilePhotoUrl || "",
        },
        token,
      });
  } catch (error) {
    console.error("Google Auth error:", error);
    return next(errorHandler(500, "Internal server error during Google auth"));
  }
};
