import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { payslips } from '@/features/payslip/payslipData'
import { DownloadIcon } from 'lucide-react'

const fmt = (n) => `$${n.toLocaleString()}`

const Payslip = () => (
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
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {['Period', 'Basic Salary', 'Net Salary', 'Actions'].map(h => (
                <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payslips.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{row.period}</TableCell>
                <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{fmt(row.basicSalary)}</TableCell>
                <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{fmt(row.netSalary)}</TableCell>
                <TableCell className="px-6 py-4">
                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => window.open(row.downloadUrl, '_blank')}>
                    <DownloadIcon className="size-3.5" /> Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  </div>
)

export default Payslip
