import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { FileTextIcon, PlusIcon, PrinterIcon } from 'lucide-react'
import api from '@/lib/api'
import CreatePayslipModal from '@/features/payslip/components/CreatePayslipModal'

const fmt = (n) => `$${Number(n).toLocaleString()}`
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const AdminPayslips = () => {
  const [payslips, setPayslips] = useState([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)

  const fetchPayslips = async () => {
    try {
      const res = await api.get('/payslip')
      setPayslips(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPayslips() }, [])

  const totalEmployees = new Set(payslips.map(p => p.employeeId)).size

  return (
    <div className="space-y-8">

      <div className="flex items-start justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold">Payslips</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage all employee payslips</p>
        </div>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <PlusIcon className="size-4" /> Create Payslip
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[['Total Payslips', payslips.length], ['Total Employees', totalEmployees]].map(([title, value]) => (
            <Card key={title} className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                  <FileTextIcon className="size-4 text-brand" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{title}</p>
                  <p className="text-2xl font-semibold leading-none mt-1">{loading ? '—' : value}</p>
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
          {loading ? <p className="text-sm text-muted-foreground p-6">Loading...</p> : (
            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {['Employee', 'Department', 'Period', 'Basic Salary', 'Allowances', 'Deductions', 'Net Salary', 'Actions'].map(h => (
                    <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.map((p) => {
                  const emp = p.employee
                  return (
                    <TableRow key={p._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                      <TableCell className="px-6 py-[17.75px]">
                        <p className="font-outfit font-medium text-sm text-[#0F172B]">{emp?.firstName} {emp?.lastName}</p>
                        <p className="font-outfit text-xs text-[#62748E]">{emp?.email}</p>
                      </TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{emp?.department}</TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{MONTHS[p.month - 1]} {p.year}</TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.basicSalary)}</TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.allowances)}</TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.deductions)}</TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{fmt(p.netSalary)}</TableCell>
                      <TableCell className="px-6 py-4">
                        <button onClick={() => window.open(`/print/payslip/${p._id}`, '_blank')} className="size-7 rounded-md flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">
                          <PrinterIcon className="size-3.5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CreatePayslipModal open={createOpen} onOpenChange={setCreateOpen} onSuccess={fetchPayslips} />
    </div>
  )
}

export default AdminPayslips
