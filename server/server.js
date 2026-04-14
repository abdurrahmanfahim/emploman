import cors from "cors";
import "dotenv/config";
import express from "express";
import multer from "multer";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendance.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

// Routes
app.get("/", (req, res) =>
  res.status(200).json({ message: "Server is running" }),
);
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/employees", employeeRouter)
app.use("/api/v1/profile", profileRouter)
app.use("/api/v1/attendance", attendanceRouter)

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
