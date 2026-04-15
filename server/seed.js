import dns from "dns";
import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const TemporaryPassword = "admin123";

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (!ADMIN_EMAIL) {
      console.error("Admin email not found");
      process.exit(1);
    }

    await connectDB();

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log("User already exists as role", existingAdmin.role);
      process.exit(0);
    }

    console.log(process.env.ADMIN_EMAIL)

    const hashedPassword = await bcrypt.hash(TemporaryPassword, 12);

    const admin = await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin user created");
    console.log("\nemail: ", admin.email);
    console.log("password: ", TemporaryPassword);
    console.log("\nchange the password after login.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed: ", error);
  }
}

registerAdmin();
