import { Schema, model, Model, connect } from "mongoose";
import { ICard, cardSchema } from "./cardModel";
import { ITransfer, transferSchema } from "./transferModel";

interface IUser {
  name: string;
  email: string;
  password: string;
  contacts: string[];
  cards: ICard[];
  history: ITransfer[];
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cards: [{ type: cardSchema, default: [] }],
  history: [{ type: transferSchema, default: [] }],
  contacts: [{ type: String, default: [] }],
});

type userModel = Model<IUser>;

const User: userModel = model<IUser, userModel>("User", userSchema);
export default User;
