import cors from "cors";
import dns from "dns";
import "dotenv/config";
import express from "express";
import multer from "multer";
import connectDB from "./config/db.js";
import attendanceRouter from "./routes/attendance.js";
import authRouter from "./routes/authRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipRoute.js";
import profileRouter from "./routes/profileRoutes.js";
import dashboardRouter from "./routes/dashboardRoute.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"


dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use(multer().none());

// Routes
app.get("/", (_req, res) =>
  res.status(200).json({ message: "Server is running" }),
);
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/employees", employeeRouter)
app.use("/api/v1/profile", profileRouter)
app.use("/api/v1/attendance", attendanceRouter)
app.use("/api/v1/leave", leaveRouter)
app.use("/api/v1/payslip", payslipRouter)
app.use("/api/v1/dashboard", dashboardRouter)

app.use("/api/inngest", serve({ client: inngest, functions }));

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
