import { CalendarIcon, DollarSignIcon, FileTextIcon } from 'lucide-react'
import { dummyEmployeeDashboardData } from '@/dummyData'

const { employee, currentMonthAttendance, pendingLeaves, latestPayslip } = dummyEmployeeDashboardData

export const user = {
  name: `${employee.firstName} ${employee.lastName}`,
  role: employee.position,
  department: employee.department,
}

export const statCards = [
  { title: 'Days Present',   value: currentMonthAttendance,              icon: CalendarIcon  },
  { title: 'Pending Leaves', value: pendingLeaves,                       icon: FileTextIcon  },
  { title: 'Latest Payslip', value: `$${latestPayslip.netSalary.toLocaleString()}`, icon: DollarSignIcon },
]
