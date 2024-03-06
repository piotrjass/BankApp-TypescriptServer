import { Request, Response } from "express";
import User from "../models/userModel";

export const getContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const contacts = user.contacts;
    res.status(200).json({
      message: "success",
      contacts: contacts,
    });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
