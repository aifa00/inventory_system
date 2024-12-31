import { Router } from "express";
import {
  addItem,
  deleteItem,
  editItem,
  getItems,
  viewItem,
} from "../controllers/itemController.js";
import { authorizeUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(authorizeUser, getItems).post(authorizeUser, addItem);
router
  .route("/:itemId")
  .get(authorizeUser, viewItem)
  .put(authorizeUser, editItem)
  .delete(authorizeUser, deleteItem);

export default router;
