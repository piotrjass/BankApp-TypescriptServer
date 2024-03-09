import { Request, Response, CookieOptions } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { serialize } from "cookie";

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: string | undefined = process.env.JWT_EXPIRES_IN;

const jwt = require("jsonwebtoken");

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const checkCookie = async (req: Request, res: Response) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const userId = user._id.toString();
    const token = generateToken(userId);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 30),
      secure: true,
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Logged in!",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
