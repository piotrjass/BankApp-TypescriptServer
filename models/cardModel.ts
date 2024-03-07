import { Schema, model, Model, connect } from "mongoose";
export interface ICard {
  color: string;
  balance: number;
  last_digits: number;
  exp_date: string;
}

export const cardSchema = new Schema<ICard>({
  color: { type: String, required: true },
  balance: { type: Number, required: true },
  last_digits: { type: Number, required: true },
  exp_date: { type: String, required: true },
});

cardSchema.methods.reduceBalance = function (amount: number) {
  if (amount <= 0) {
    throw new Error("Amount must be a positive number");
  }
  if (this.balance < amount) {
    throw new Error("Insufficient funds");
  }
  this.balance -= amount;
};

cardSchema.methods.increaseBalance = function (amount: number) {
  if (amount <= 0) {
    throw new Error("Amount must be a positive number");
  }
  this.balance += amount;
};

type cardModel = Model<ICard>;
const card: cardModel = model<ICard, cardModel>("card", cardSchema);
export default card;
