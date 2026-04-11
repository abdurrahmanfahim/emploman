import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { dummyEmployeeData } from '@/dummyData'
import { UsersIcon } from 'lucide-react'

const statusStyle = {
  ACTIVE:   'bg-green-50 text-green-700 border-green-200',
  INACTIVE: 'bg-red-50 text-red-600 border-red-200',
}

const fmt = (n) => `$${Number(n).toLocaleString()}`
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const Employees = () => (
  <div className="space-y-8">

    <div className="pb-6 border-b border-border">
      <h1 className="text-2xl font-semibold">Employees</h1>
      <p className="text-sm text-muted-foreground mt-1">Manage and view all employee records</p>
    </div>

    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <UsersIcon className="size-4 text-brand" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-semibold leading-none mt-1">{dummyEmployeeData.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <UsersIcon className="size-4 text-brand" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-2xl font-semibold leading-none mt-1">{dummyEmployeeData.filter(e => e.employmentStatus === 'ACTIVE').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <UsersIcon className="size-4 text-brand" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Departments</p>
              <p className="text-2xl font-semibold leading-none mt-1">{new Set(dummyEmployeeData.map(e => e.department)).size}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <Card className="border border-[rgba(226,232,240,0.7)] shadow-none rounded-lg py-0 gap-0">
      <div className="px-6 py-4 border-b border-[rgba(226,232,240,0.7)]">
        <p className="font-outfit text-base font-semibold text-[#0F172B]">Employee List</p>
      </div>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {['Name', 'Department', 'Position', 'Basic Salary', 'Net Salary', 'Join Date', 'Status'].map(h => (
                <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyEmployeeData.map((emp) => (
              <TableRow key={emp._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                <TableCell className="px-6 py-[17.75px]">
                  <div>
                    <p className="font-outfit font-medium text-sm text-[#0F172B]">{emp.firstName} {emp.lastName}</p>
                    <p className="font-outfit font-normal text-xs text-[#62748E]">{emp.email}</p>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{emp.department}</TableCell>
                <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{emp.position}</TableCell>
                <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{fmt(emp.basicSalary)}</TableCell>
                <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{fmt(emp.basicSalary + emp.allowances - emp.deductions)}</TableCell>
                <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{fmtDate(emp.joinDate)}</TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="outline" className={statusStyle[emp.employmentStatus] ?? ''}>{emp.employmentStatus}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  </div>
)

export default Employees
