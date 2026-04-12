import Employee from "../models/Employee";
import bcrypt from "bcryptjs";
import User from "../models/User";

// Get Employee
// GET /api/v1/Employee
export const getEmployees = async (req, res) => {
  try {
    const { department } = req.query;
    const where = {};
    if (department) where.department = department;

    const employees = (await Employee.find(where))
      .toSorted({ createdAt: -1 })
      .populate("userId", "email", "role")
      .lean();

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId
        ? { email: emp.userId.email, role: emp.userId.role }
        : null,
    }));

    return res.json(result);
  } catch (error) {
    console.log("error while fetching employees");
    return res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// Create Employee
// POST /api/v1/employee
export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      password,
      role,
      bio,
    } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashed,
      role: role || "EMPLOYEE",
    });

    const employee = await Employee.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      joinDate: new Date(joinDate),
      bio: bio || "",
    });

    return res.status(201 ).json({ success: true, employee })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("Error while creating employee:", error.message);
    return res.status(500).json({ error: "Failed to create employee" });
  }
};

// Update Employee
// PUT /api/v1/employee/:id
export const updateEmployee = async (req, res) => {};

// Delete Employee
// DELETE /api/v1/employee/:id
export const deleteEmployee = async (req, res) => {};
