import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
