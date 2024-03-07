import { Request, Response } from "express";
import Transfer from "../models/transferModel";
import User from "../models/userModel";
import card from "../models/cardModel";

export const sendTransfer = async (req: Request, res: Response) => {
  const { card_last_digits, amount, conctact } = req.body;
  try {
    const user = await User.findOne({ "cards.last_digits": card_last_digits });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const card = user.cards.find(
      (card) => card.last_digits === Number(card_last_digits)
    );
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    card.balance -= amount;
    await user.save();

    res.status(200).json({ message: "Transfer sent successfully" });
  } catch (error) {
    console.error("Error sending transfer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
