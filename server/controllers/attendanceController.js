// Clock in/out for employee

import { inngest } from "../inngest/index.js";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// POST /api/v1/attendance
export const clockInOut = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.isDeleted)
      return res.status(400).json({
        message: "Your account is deactivated. You cannot clock in/out.",
      });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    const now = new Date();

    if (!existing) {
      const isLate = now.getHours() >= 9 && now.getMinutes() > 0;
      const attendance = await Attendance.create({
        employeeId: employee._id,
        date: today,
        checkIn: now,
        status: isLate ? "LATE" : "PRESENT",
      });

      await inngest.send({
        name: "employee/check-out",
        data: { employeeId: employee._id.toString(), attendanceId: attendance._id.toString() },
      });
      
      return res.json({ success: true, type: "CHECK_IN", data: attendance });
    } else if (!existing.checkOut) {
      const checkInTime = new Date(existing.checkIn).getTime();
      const diffMs = now.getTime() - checkInTime;
      const diffHours = diffMs / (1000 * 60 * 60);

      existing.checkOut = now;

      // Compute working hours and day type
      const workingHours = parseFloat(diffHours.toFixed(2));
      let dayType;
      if (workingHours >= 8) dayType = "Full Day";
      else if (workingHours >= 6) dayType = "Three Quarter Day";
      else if (workingHours >= 4) dayType = "Half Day";
      else dayType = "Short Day";

      existing.workingHours = workingHours;
      existing.dayType = dayType;

      await existing.save();
      return res.json({ success: true, type: "CHECK_OUT", data: existing });
    } else {
      return res.json({ success: true, type: "CHECK_OUT" });
    }
  } catch (error) {
    console.error("Failed to clock in/out: ", error);
    return res
      .status(500)
      .json({ message: "Failed to clock in/out. Please try again." });
  }
};

// Get attendance
// GET /api/v1/attendance
export const getAttendance = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";

    if (isAdmin) {
      const where = {};
      if (req.query.employeeId) where.employeeId = req.query.employeeId;
      const limit = parseInt(req.query.limit || 100);
      const data = await Attendance.find(where).sort({ date: -1 }).limit(limit);
      return res.json({ data });
    }

    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const limit = parseInt(req.query.limit || 30);
    const history = await Attendance.find({ employeeId: employee._id }).sort({ date: -1 }).limit(limit);

    return res.json({
      data: history,
      employee: { isDeleted: employee.isDeleted },
    });
  } catch (error) {
    console.error("Failed to fetch attendance: ", error);
    return res.status(500).json({ message: "Failed to fetch attendance. Please try again." });
  }
};
