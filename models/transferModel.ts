import { Schema, model, Model, connect } from "mongoose";
interface ITransfer {
  author: string;
  date: string;
  amount: number;
  type: "Income" | "Expense";
}

const transferSchema = new Schema<ITransfer>({
  author: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
});

type transferModel = Model<ITransfer>;
const Transfer: transferModel = model<ITransfer, transferModel>(
  "Transfer",
  transferSchema
);
export default Transfer;
