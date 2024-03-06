import { Schema, model, Model, connect } from "mongoose";
import connectToDatabase from "../utils/connect_to_db";

interface IUser {
  name: string;
  email: string;
  password: string;
  contacts: string[];
  cards: any[];
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

type userModel = Model<IUser>;

const User: userModel = model<IUser, userModel>("User", userSchema);
export default User;
