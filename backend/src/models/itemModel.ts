import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
    maxlength: [100, "Item name must be less than 100 characters"],
  },
  quantity: {
    type: Number,
    required: [true, "Item quantity is required"],
    min: [0, "Quantity cannot be negative"],
  },
  price: {
    type: Number,
    required: [true, "Item price is required"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    required: [true, "Item description is required"],
    trim: true,
    maxlength: [500, "Description must be less than 500 characters"],
  },
  category: {
    type: String,
    required: [true, "Category is reqiured"],
    trim: true,
    maxlength: [100, "Category must be less than 100 characters long"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
