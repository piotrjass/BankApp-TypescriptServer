import { Schema, model, connect } from "mongoose";
import runBcrypt from "../utils/bcrypt_hash";
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

const User = model<IUser>("User", userSchema);

run().catch((err) => console.log(err));

async function run() {
  await connectToDatabase();
  const user = new User({
    name: "Bill",
    email: "bill@initech.com",
  });
  await user.save();

  console.log(user.email);
}
