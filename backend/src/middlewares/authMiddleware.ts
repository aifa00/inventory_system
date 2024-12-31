import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if the authorization header exists
    if (!req.headers.authorization) {
      throw new AppError(401, "Unauthorized, token not found");
    }

    // extract the token from the authorization header
    const [_, token] = req.headers.authorization.split(" ");

    // verify the token
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        throw new AppError(401, "Unauthorized, invalid token");
      }

      const payload = decoded as JwtPayload;
      req.body.userId = payload.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
};
