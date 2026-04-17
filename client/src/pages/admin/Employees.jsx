import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UsersIcon, PlusIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import api from '@/lib/api'
import AddEmployeeModal from '@/features/employees/components/AddEmployeeModal'
import EditEmployeeModal from '@/features/employees/components/EditEmployeeModal'

const statusStyle = {
  ACTIVE:   'bg-green-50 text-green-700 border-green-200',
  INACTIVE: 'bg-red-50 text-red-600 border-red-200',
}

const fmt = (n) => `$${Number(n).toLocaleString()}`
const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees')
      setEmployees(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEmployees() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Deactivate this employee?')) return
    try {
      await api.delete(`/employees/${id}`)
      fetchEmployees()
    } catch (err) {
      console.error(err)
    }
  }

  const active = employees.filter(e => e.employmentStatus === 'ACTIVE').length
  const depts = new Set(employees.map(e => e.department)).size

  return (
    <div className="space-y-8">

      <div className="flex items-start justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold">Employees</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and view all employee records</p>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <PlusIcon className="size-4" /> Add Employee
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[['Total Employees', employees.length], ['Active', active], ['Departments', depts]].map(([title, value]) => (
            <Card key={title} className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                  <UsersIcon className="size-4 text-brand" />
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
          <p className="font-outfit text-base font-semibold text-[#0F172B]">Employee List</p>
        </div>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-sm text-muted-foreground p-6">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {['Name', 'Department', 'Position', 'Basic Salary', 'Net Salary', 'Join Date', 'Status', 'Actions'].map(h => (
                    <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                    <TableCell className="px-6 py-[17.75px]">
                      <p className="font-outfit font-medium text-sm text-[#0F172B]">{emp.firstName} {emp.lastName}</p>
                      <p className="font-outfit font-normal text-xs text-[#62748E]">{emp.email}</p>
                    </TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{emp.department}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{emp.position}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(emp.basicSalary)}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{fmt(emp.basicSalary + emp.allowances - emp.deductions)}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmtDate(emp.joinDate)}</TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className={statusStyle[emp.employmentStatus] ?? ''}>{emp.employmentStatus}</Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setEditTarget(emp)} className="size-7 rounded-md flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">
                          <PencilIcon className="size-3.5" />
                        </button>
                        <button onClick={() => handleDelete(emp._id)} className="size-7 rounded-md flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors">
                          <Trash2Icon className="size-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddEmployeeModal open={addOpen} onOpenChange={setAddOpen} onSuccess={fetchEmployees} />
      <EditEmployeeModal open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)} employee={editTarget} onSuccess={fetchEmployees} />
    </div>
  )
}

export default Employees
