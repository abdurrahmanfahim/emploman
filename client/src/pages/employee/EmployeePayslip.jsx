import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PrinterIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'

const fmt = (n) => `$${Number(n).toLocaleString()}`
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const EmployeePayslip = () => {
  const [payslips, setPayslips] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/payslip').then(r => setPayslips(r.data.data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">

      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold">Payslips</h1>
        <p className="text-sm text-muted-foreground mt-1">Your payslip history</p>
      </div>

      <Card className="border border-[rgba(226,232,240,0.7)] shadow-none rounded-lg py-0 gap-0">
        <div className="px-6 py-4 border-b border-[rgba(226,232,240,0.7)]">
          <p className="font-outfit text-base font-semibold text-[#0F172B]">Payslip History</p>
        </div>
        <CardContent className="p-0">
          {loading ? <p className="text-sm text-muted-foreground p-6">Loading...</p> : (
            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {['Period', 'Basic Salary', 'Allowances', 'Deductions', 'Net Salary', 'Actions'].map(h => (
                    <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.map((p) => (
                  <TableRow key={p._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                    <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{MONTHS[p.month - 1]} {p.year}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.basicSalary)}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.allowances)}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(p.deductions)}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{fmt(p.netSalary)}</TableCell>
                    <TableCell className="px-6 py-4">
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => window.open(`/print/payslip/${p._id}`, '_blank')}>
                        <PrinterIcon className="size-3.5" /> Print
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

    </div>
  )
}

export default EmployeePayslip
