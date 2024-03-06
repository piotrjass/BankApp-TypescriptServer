import { Request, Response } from "express";
import User from "../models/userModel";

export const getCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const cards = user.cards;
    res.status(200).json({
      message: "success",
      cards: cards,
    });
  } catch (error) {
    console.error("Error retrieving cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
