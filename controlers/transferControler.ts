import { Request, Response } from "express";
import Transfer from "../models/transferModel";
import User from "../models/userModel";
import card from "../models/cardModel";

const reduceOwnCardBalance = async (
  card_last_digits: string,
  amount: number
) => {
  try {
    const user = await User.findOne({ "cards.last_digits": card_last_digits });
    if (!user) {
      throw new Error("User not found");
    }
    const card = user.cards.find(
      (card) => card.last_digits === Number(card_last_digits)
    );
    if (!card) {
      throw new Error("Card not found");
    }
    card.balance -= amount;
    await user.save();
  } catch (error) {
    throw error;
  }
};

const increaseRecepientCardBalance = async (
  amount: number,
  contact: string
) => {
  try {
    const user = await User.findOne({ name: contact });
    if (!user) {
      throw new Error("User not found");
    }
    const card = user.cards[0];
    if (!card) {
      throw new Error("No cards found for this user");
    }
    card.balance += Number(amount);
    await user.save();
  } catch (error) {
    throw error;
  }
};

export const sendTransfer = async (req: Request, res: Response) => {
  const { card_last_digits, amount, contact } = req.body;
  try {
    await reduceOwnCardBalance(card_last_digits, amount);
    await increaseRecepientCardBalance(amount, contact);
    await handleTransfer(card_last_digits, contact, amount);
    res.status(200).json({ message: "Transfer sent successfully" });
  } catch (error) {
    console.error("Error sending transfer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleTransfer = async (
  card_last_digits: string,
  contact: string,
  amount: number
) => {
  try {
    const sender = await User.findOne({
      "cards.last_digits": card_last_digits,
    });
    const recipient = await User.findOne({ name: contact });
    if (!recipient || !sender) {
      throw new Error(!recipient ? "Recipient not found" : "Sender not found");
    }
    sender.history.push({
      author: recipient.name,
      date: new Date().toISOString(),
      amount,
      type: "Expense",
    });

    recipient.history.push({
      author: sender.name,
      date: new Date().toISOString(),
      amount,
      type: "Income",
    });

    await sender.save();
    await recipient.save();
  } catch (error) {
    throw error;
  }
};
