import { Request, Response } from "express";

export const createUser = (req: Request, res: Response): void => {
  res.status(200).json({
    message: "This route is not yet defined! This is a create user!",
  });
};
