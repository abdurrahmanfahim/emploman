import { dummyPayslipData } from '@/dummyData'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const payslips = dummyPayslipData.map(p => ({
  id: p._id,
  period: `${monthNames[p.month - 1]} ${p.year}`,
  basicSalary: p.basicSalary,
  netSalary: p.netSalary,
  downloadUrl: '#',
}))
