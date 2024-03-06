import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const database: string | undefined = process.env.DATABASE;
const database_password: string | undefined = process.env.DATABASE_PASSWORD;

if (!database || !database_password) {
  throw new Error(
    "DATABASE or DATABASE_PASSWORD environment variables are not set."
  );
}

const connectToDatabase = async () => {
  const DB: string = database.replace("password", database_password);
  try {
    await mongoose.connect(DB, {
      dbName: "bank",
    });
    console.log("Connected to bank database successfully");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};

export default connectToDatabase;
