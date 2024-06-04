import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database: " + error);
  });



const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

//use the userRouter
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
