import { Response } from "express";

function sendResponse(
  res: Response,
  stausCode: number,
  message: string,
  data?: any
) {
  res.status(stausCode).json({ success: true, message, ...data });
}

export default sendResponse;
