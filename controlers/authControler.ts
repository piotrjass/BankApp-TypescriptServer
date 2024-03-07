import { Request, Response } from "express";
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: string | undefined = process.env.JWT_EXPIRES_IN;

const jwt = require("jsonwebtoken");

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const userId = user._id.toString();
    const token = generateToken(userId);
    res.status(200).json({
      message: "Logged in!",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
