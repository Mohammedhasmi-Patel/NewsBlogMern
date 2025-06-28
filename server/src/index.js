import express from "express";
import dotenv from "dotenv";
import connectDB from "../utils/db.js";
import authRoutes from "../routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    message,
    success: false,
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log("server is started");
});
