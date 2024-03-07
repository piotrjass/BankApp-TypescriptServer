import { Schema, model, Model, connect } from "mongoose";
interface ICard {
  color: string;
  balance: number;
  last_digits: number;
  exp_datepe: string;
}

const cardSchema = new Schema<ICard>({
  color: { type: String, required: true },
  balance: { type: Number, required: true },
  last_digits: { type: Number, required: true },
  exp_datepe: { type: String, required: true },
});

type cardModel = Model<ICard>;
const card: cardModel = model<ICard, cardModel>("card", cardSchema);
export default card;
