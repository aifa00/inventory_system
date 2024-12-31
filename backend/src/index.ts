import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbConnection from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// application middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
dbConnection();

// define routes
app.use("/items", itemRoutes);
app.use("/", userRoutes);

// global error handler
app.use(errorHandler);

// start the server
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
