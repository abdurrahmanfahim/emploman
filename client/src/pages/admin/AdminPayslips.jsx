import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { dummyPayslipData } from '@/dummyData'
import { FileTextIcon } from 'lucide-react'

const fmt = (n) => `$${Number(n).toLocaleString()}`
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const statCards = [
  { title: 'Total Payslips',  value: dummyPayslipData.length },
  { title: 'Total Employees', value: new Set(dummyPayslipData.map(p => p.employeeId)).size },
]

const AdminPayslips = () => (
  <div className="space-y-8">

    <div className="pb-6 border-b border-border">
      <h1 className="text-2xl font-semibold">Payslips</h1>
      <p className="text-sm text-muted-foreground mt-1">View and manage all employee payslips</p>
    </div>

    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statCards.map(({ title, value }) => (
          <Card key={title} className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                <FileTextIcon className="size-4 text-brand" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{title}</p>
                <p className="text-2xl font-semibold leading-none mt-1">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    <Card className="border border-[rgba(226,232,240,0.7)] shadow-none rounded-lg py-0 gap-0">
      <div className="px-6 py-4 border-b border-[rgba(226,232,240,0.7)]">
        <p className="font-outfit text-base font-semibold text-[#0F172B]">Payslip Records</p>
      </div>
      <CardContent className="p-0">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {['Employee', 'Department', 'Period', 'Basic Salary', 'Allowances', 'Deductions', 'Net Salary'].map(h => (
                <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyPayslipData.map((p) => {
              const emp = Array.isArray(p.employee) ? p.employee[0] : p.employee
              return (
                <TableRow key={p._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                  <TableCell className="px-6 py-[17.75px]">
                    <p className="font-outfit font-medium text-sm text-[#0F172B]">{emp?.firstName} {emp?.lastName}</p>
                    <p className="font-outfit text-xs text-[#62748E]">{emp?.email}</p>
                  </TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{emp?.department}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{monthNames[p.month - 1]} {p.year}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.basicSalary)}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.allowances)}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.deductions)}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{fmt(p.netSalary)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  </div>
)

export default AdminPayslips
