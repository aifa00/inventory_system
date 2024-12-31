import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import sendResponse from "../utils/appResponse.js";
import jwt, { JwtPayload } from "jsonwebtoken";

// handle user registration
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      throw new AppError(400, "Email and password is required");
    }

    const trimmedEmail = email.trim();

    // check if the user already exist
    const userExist = await User.findOne({ email: trimmedEmail });
    if (userExist) {
      throw new AppError(409, "User already exist");
    }

    // validate password strength
    if (password && password.length < 6) {
      throw new AppError(400, "Password must be atleast 6 character long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create and save new user with hashed password
    const newUser = new User({
      email: trimmedEmail,
      password: hashedPassword,
    });
    await newUser.save();

    sendResponse(res, 201, "User registered successfully");
  } catch (error) {
    next(error);
  }
};

// handle user login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      throw new AppError(400, "Email and password is required");
    }

    const trimmedEmail = email.trim();

    // check if the user exist
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      throw new AppError(404, "User does not exist");
    }

    // check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new AppError(401, "Password does not match");
    }

    // sign jwt token
    const jwtPayload = {
      userId: user._id,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    // user data to store in client side
    const userData = {
      isUser: true,
      email: user.email,
    };

    sendResponse(res, 200, "Logged in successfully", { token, user: userData });
  } catch (error) {
    next(error);
  }
};

// check if the user is logged-in
export const verifyAuthStatus = async (
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
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err, decoded) => {
        if (err) {
          throw new AppError(401, "Unauthorized, invalid token");
        }
        const payload = decoded as JwtPayload;

        // check if the user exist
        const user = await User.findById(payload.userId);
        if (!user) {
          throw new AppError(401, "Unauthorized, User not found");
        }

        // user data to store in client side
        const userData = {
          isUser: true,
          email: user.email,
        };
        sendResponse(res, 200, "Token is valid, user authenticated", {
          user: userData,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};
