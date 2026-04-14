import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

// Create leave
// POST /api/v1/leave
export const createLeave = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.isDeleted) {
      return res.status(400).json({
        message: "Your account is deactivated. You cannot apply for leave.",
      });
    }

    const { leaveType, startDate, endDate } = req.body;

    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(startDate) <= today || new Date(endDate) <= today) {
      return res
        .status(400)
        .json({ message: "Leave cannot be applied for past dates." });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date." });
    }

    const leave = await LeaveApplication.create({
      employeeId: employee._id,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      status: "PENDING",
    });

    await leave.save();
    return res.json({ success: true });
  } catch (error) {
    console.error("Failed to apply leave: ", error);
    return res
      .status(500)
      .json({ message: "Failed to apply leave. Please try again." });
  }
};

// Get all leaves for employee
// GET /api/v1/ leave
export const getLeave = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = req.session.role === "ADMIN";

    if (isAdmin) {
      const status = req.query.status;
      const where = status ? { status } : {};
      const leaves = await LeaveApplication.find(where)
        .populate("employeeId", "firstName lastName")
        .sort({ createdAt: -1 });
      const data = leaves.map((l) => {
        const obj = l.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: {
            employeeId: obj.employeeId,
            firstName: obj.employeeId.firstName,
            lastName: obj.employeeId.lastName,
          },
          type: obj.type,
          startDate: obj.startDate,
          endDate: obj.endDate,
          reason: obj.reason,
          status: obj.status,
        };
      });
      return res.json({ data });
    } else {
      const employee = await Employee.findOne({ userId: session.userId });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const leaves = await LeaveApplication.find({
        employeeId: employee._id,
      }).sort({ createdAt: -1 });

      return res.json({
        data: leaves,
        employee: { ...employee, id: employee._id },
      });
    }
  } catch (error) {
    console.error("Failed to get leave: ", error);
    return res
      .status(500)
      .json({ message: "Failed to get leave. Please try again." });
  }
};

// Update leave
// PATCH /api/v1/leave
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await LeaveApplication.findByIdAndUpdate(req.params.id, { status }, { returnDocument: "after" })
    return res.json({ success: true, data: leave })
  } catch (error) {
    console.error("Failed to update leave: ", error);
    return res
      .status(500)
      .json({ message: "Failed to update leave. Please try again." });
  }
};
