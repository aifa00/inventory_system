import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("mongodb connection established");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
