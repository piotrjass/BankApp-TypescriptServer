import { Request, Response } from "express";
import User from "../models/userModel"; // Import modelu User
import runBcrypt from "../utils/bcrypt_hash";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Success",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, plain_password } = req.body;
    const password = await runBcrypt(plain_password);
    console.log(name, email, password);
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(200).json({
      message: "success",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ message: "User deleted successfully", existingUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const { name, email } = req.body;
    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    await existingUser.save();
    res
      .status(200)
      .json({ message: "User updated successfully", user: existingUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
