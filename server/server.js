import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
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

app.use("/api/user", userRouter);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
