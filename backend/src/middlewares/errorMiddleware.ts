import { Request, Response, NextFunction } from "express";
import { AppErrorType } from "../utils/appError.js";

const errorHandler = async (
  err: AppErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ success: false, message });
};

export default errorHandler;
