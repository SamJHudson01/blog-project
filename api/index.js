import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
