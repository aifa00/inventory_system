import { Router } from "express";
import {
  verifyAuthStatus,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = Router();
router.get("/auth-status", verifyAuthStatus);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
