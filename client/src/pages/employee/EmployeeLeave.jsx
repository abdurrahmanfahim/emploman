import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BriefcaseIcon, HeartPulseIcon, PalmtreeIcon, PlusIcon } from 'lucide-react'
import ApplyLeaveModal from '@/features/leave/components/ApplyLeaveModal'
import api from '@/lib/api'

const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const typeStyle = {
  SICK:   'bg-red-50 text-red-600 border-red-200',
  CASUAL: 'bg-blue-50 text-blue-600 border-blue-200',
  ANNUAL: 'bg-green-50 text-green-700 border-green-200',
}

const statusStyle = {
  APPROVED: 'bg-green-50 text-green-700 border-green-200',
  PENDING:  'bg-yellow-50 text-yellow-700 border-yellow-200',
  REJECTED: 'bg-red-50 text-red-600 border-red-200',
}

const EmployeeLeave = () => {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leave')
      setLeaves(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLeaves() }, [])

  const summary = [
    { type: 'Sick Leave',   taken: leaves.filter(l => l.type === 'SICK').length,   icon: HeartPulseIcon },
    { type: 'Casual Leave', taken: leaves.filter(l => l.type === 'CASUAL').length, icon: BriefcaseIcon  },
    { type: 'Annual Leave', taken: leaves.filter(l => l.type === 'ANNUAL').length, icon: PalmtreeIcon   },
  ]

  return (
    <div className="space-y-8">

      <div className="flex items-start justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold">Leave Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Your leave history and requests</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <PlusIcon className="size-4" /> Apply for Leave
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Summary</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {summary.map(({ type, taken, icon: Icon }) => (
            <Card key={type} className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-brand" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{type}</p>
                  <p className="text-2xl font-semibold leading-none mt-1">
                    {loading ? '—' : taken} <span className="text-sm font-normal text-muted-foreground">taken</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border border-[rgba(226,232,240,0.7)] shadow-none rounded-lg py-0 gap-0">
        <div className="px-6 py-4 border-b border-[rgba(226,232,240,0.7)]">
          <p className="font-outfit text-base font-semibold text-[#0F172B]">Leave History</p>
        </div>
        <CardContent className="p-0">
          {loading ? <p className="text-sm text-muted-foreground p-6">Loading...</p> : (
            <ScrollArea>
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {['Type', 'Dates', 'Reason', 'Status'].map(h => (
                      <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaves.map((row) => (
                    <TableRow key={row._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                      <TableCell className="px-6 py-4">
                        <Badge variant="outline" className={typeStyle[row.type] ?? ''}>{row.type}</Badge>
                      </TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmt(row.startDate)} – {fmt(row.endDate)}</TableCell>
                      <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{row.reason}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge variant="outline" className={statusStyle[row.status] ?? ''}>{row.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <ApplyLeaveModal open={modalOpen} onOpenChange={setModalOpen} onSuccess={fetchLeaves} />
    </div>
  )
}

export default EmployeeLeave
