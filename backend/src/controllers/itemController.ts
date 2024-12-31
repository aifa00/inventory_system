import { Request, Response, NextFunction } from "express";
import Item from "../models/itemModel.js";
import sendResponse from "../utils/appResponse.js";
import AppError from "../utils/appError.js";
import { error } from "console";
import mongoose from "mongoose";

interface ItemSearchQuery {
  userId: mongoose.Types.ObjectId;
  itemName?: { $regex: RegExp };
}

// get items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageNo = "1", searchTerm } = req.query;
    const { userId } = req.body;

    if (!userId) {
      throw new AppError(401, "User id is required");
    }

    // Define number of items per page for pagination
    const itemsPerPage = 5;
    const pagesToSkip = itemsPerPage * (Number(pageNo) - 1);

    // Initialize empty search query object
    const searchQuery: ItemSearchQuery = {
      userId: new mongoose.Types.ObjectId(userId as string),
    };

    if (searchTerm) {
      searchQuery.itemName = { $regex: new RegExp(searchTerm as string, "i") };
    }

    // Aggregate query to fetch items with pagination and optional search
    const items = await Item.aggregate([
      {
        $match: searchQuery,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: pagesToSkip,
      },
      {
        $limit: itemsPerPage,
      },
      {
        $project: {
          itemName: 1,
          quantity: 1,
          price: 1,
          category: 1,
        },
      },
    ]);

    // extract the total item's count and total number of pages
    const totalItemsCount = await Item.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalItemsCount / itemsPerPage) || 1;

    sendResponse(res, 200, "Items retrieved successfully", {
      totalItemsCount,
      totalPages,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// add new item
export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemName, quantity, price, description, category, userId } =
      req.body;

    if (!userId) {
      throw new AppError(401, "User id is required");
    }

    // validate inputs
    if (!itemName || !quantity || !price || !description || !category) {
      throw new AppError(400, "All fields are required");
    }
    if (quantity < 0) {
      throw new AppError(400, "Quantity cannot be negative");
    }
    if (!Number.isInteger(quantity)) {
      throw new AppError(400, "Quantity must be an integer");
    }
    if (price < 0) {
      throw new AppError(400, "Price cannot be negative");
    }

    // check if an item with the same name already exists
    const itemExist = await Item.findOne({
      userId: new mongoose.Types.ObjectId(userId as string),
      itemName: { $regex: new RegExp(`^${itemName}$`, "i") },
    });
    if (itemExist) {
      throw new AppError(409, "Item with the same name already exists");
    }

    // create and save new item
    const newItem = new Item({
      itemName,
      quantity,
      price,
      description,
      category,
      userId: new mongoose.Types.ObjectId(userId as string),
    });
    await newItem.save();

    sendResponse(res, 201, "New item is added successfully");
  } catch (error) {
    next(error);
  }
};

// edit an item
export const editItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;
    const { itemName, quantity, price, description, category, userId } =
      req.body;

    if (!itemId) {
      throw new AppError(400, "Item id is required");
    }

    // validate inputs
    if (!itemName || !quantity || !price || !description || !category) {
      throw new AppError(400, "All fields are required");
    }
    if (quantity < 0) {
      throw new AppError(400, "Quantity cannot be negative");
    }
    if (price < 0) {
      throw new AppError(400, "Price cannot be negative");
    }

    // check if an item with the same name exists, excluding currect document
    const itemExist = await Item.findOne({
      _id: { $ne: new mongoose.Types.ObjectId(itemId as string) },
      userId: new mongoose.Types.ObjectId(userId as string),
      itemName: { $regex: new RegExp(`^${itemName}$`, "i") },
    });

    if (itemExist) {
      throw new AppError(409, "Item with the same name already exists");
    }

    const updatedItem = {
      itemName,
      quantity,
      price,
      description,
      category,
    };

    await Item.findByIdAndUpdate(itemId, updatedItem);

    sendResponse(res, 200, "Item updated successfully");
  } catch (error) {
    next(error);
  }
};

// delete an item
export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      throw new AppError(400, "Item id is required");
    }
    // perform the deletion
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      throw new AppError(404, "Item does not exist to delete");
    }

    sendResponse(res, 200, "Item deleted successfully");
  } catch (error) {
    next(error);
  }
};

// view an item
export const viewItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      throw new AppError(400, "Item id is required");
    }

    // Query the specific item from the database
    const item = await Item.findById(itemId).select(
      "itemName quantity price description category"
    );
    if (!item) {
      throw new AppError(404, "Item not found");
    }

    sendResponse(res, 200, "Item retrieved successfully", { item });
  } catch (error) {
    next(error);
  }
};
