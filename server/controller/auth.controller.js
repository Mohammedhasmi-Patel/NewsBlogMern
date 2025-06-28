import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const isUsernameTaken = existingUser.username == username;
      const isEmailTaken = existingUser.email == email;

      if (isUsernameTaken) {
        return res.status(400).json({ message: "Username is already taken." });
      }

      if (isEmailTaken) {
        return res
          .status(400)
          .json({ message: "Email is already registered." });
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
