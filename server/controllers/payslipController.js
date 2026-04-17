import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js";

// Create payslip
// POST /api/v1/payslip
export const createPayslip = async (req, res) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;
    const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    if (!employeeId || !month || !year || !basicSalary) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const payslip = await Payslip.create({
      employeeId,
      month: Number(month),
      year: Number(year),
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary,
    })

    return res.json({ success: true, data: payslip })
  } catch (error) {
    console.error('Error white creating payslip: ', error)
    return res.status(500).json({ error: "Payslip Creation Failed." })
  }
};

// Get payslip
// GET /api/v1/payslip
export const getPayslip = async (req, res) => {
  try {
    const session = req.session
    const isAdmin = session.role === "ADMIN"
    if (isAdmin) {
      const payslip = await Payslip.find().populate("employeeId")
        .sort({ createdAt: -1 })
      const data = payslip.map((p) => {
        const obj = p.toObject()
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.employeeId,
          employeeId: obj.employeeId?._id?.toString(),
        }
      })
      return res.json({data})
    } else {
      const employee = await Employee.findOne({ userId: session.userId })
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" })
      }

      const payslip = await Payslip.find({ employeeId: employee._id }).sort({ createdAt: -1 })
      return res.json({data: payslip})
    }
  } catch (error) {
    console.error('Error white getting payslips: ', error)
    return res.status(500).json({error: "Failed to get payslips."})
  }
}

// Get payslip by id
// GET /api/v1/payslip/:id
export const getPayslipById = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id).populate("employeeId").lean()
    if (!payslip) return res.status(404).json({ error: "Payslip not found." })
    
    const result = {
      ...payslip,
      id: payslip._id.toString(),
      employee: payslip.employeeId
    }
    return res.json({data: result})
    
  } catch (error) {
    console.error('Error white getting payslip: ', error)
    return res.status(500).json({error: "Failed to get payslip."})
  }
}
