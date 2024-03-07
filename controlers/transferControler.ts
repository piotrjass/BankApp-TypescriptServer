import { Request, Response } from "express";
import Transfer from "../models/transferModel";

export const sendTransfer = async (
  req: Request,
  res: Response,
  card: string
): Promise<void> => {};
