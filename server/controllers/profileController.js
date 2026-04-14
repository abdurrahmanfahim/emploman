// Get profile

import Employee from "../models/Employee.js";

// GET /api/v1/profile
export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      // Authenticated user is not an employee - return admin profile
      return res.json({
        firstName: "Admin",
        lastName: "",
        email: session.email,
      });
    }
  } catch (error) {
    console.error("Failed to fetch profile: ", error);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// Update profile
// PUT /api/v1/profile
export const updateProfile = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.isDeleted) {
      return res.status(400).json({ message: "Your account is deactivated. You cannot update your profile." });
    }

    await Employee.findByIdAndUpdate(employee._id, { bio: req.body.bio })
    
    return res.json({success: true})
  } catch (error) {
    console.error("Failed to update profile: ", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};
