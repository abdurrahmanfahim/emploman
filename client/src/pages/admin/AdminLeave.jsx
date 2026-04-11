import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { dummyLeaveData } from '@/dummyData'
import { CheckIcon, FileTextIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import LeaveActionModal from '@/features/leave/components/LeaveActionModal'

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

const statCards = [
  { title: 'Total Requests', value: dummyLeaveData.length },
  { title: 'Pending',        value: dummyLeaveData.filter(l => l.status === 'PENDING').length  },
  { title: 'Approved',       value: dummyLeaveData.filter(l => l.status === 'APPROVED').length },
]

const AdminLeave = () => {
  const [modal, setModal] = useState({ open: false, action: null, leave: null })

  const openModal = (action, leave) => setModal({ open: true, action, leave })
  const closeModal = () => setModal(m => ({ ...m, open: false }))

  const handleConfirm = (action, id) => {
    console.log(`${action} leave:`, id)
  }

  return (
  <div className="space-y-8">

    <div className="pb-6 border-b border-border">
      <h1 className="text-2xl font-semibold">Leave Management</h1>
      <p className="text-sm text-muted-foreground mt-1">Review and manage employee leave requests</p>
    </div>

    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        <p className="font-outfit text-base font-semibold text-[#0F172B]">Leave Requests</p>
      </div>
      <CardContent className="p-0">
        <ScrollArea>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {['Employee', 'Type', 'Dates', 'Reason', 'Status', 'Action'].map(h => (
                  <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyLeaveData.map((row) => {
                const emp = Array.isArray(row.employee) ? row.employee[0] : row.employee
                return (
                  <TableRow key={row._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                    <TableCell className="px-6 py-[17.75px]">
                      <p className="font-outfit font-medium text-sm text-[#0F172B]">{emp?.firstName} {emp?.lastName}</p>
                      <p className="font-outfit text-xs text-[#62748E]">{emp?.department}</p>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className={typeStyle[row.type] ?? ''}>{row.type}</Badge>
                    </TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{fmt(row.startDate)} – {fmt(row.endDate)}</TableCell>
                    <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{row.reason}</TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant="outline" className={statusStyle[row.status] ?? ''}>{row.status}</Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {row.status === 'PENDING' ? (
                        <div className="flex gap-2">
                          <button onClick={() => openModal('approve', row)} className="size-7 rounded-md flex items-center justify-center text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors"><CheckIcon className="size-3.5" /></button>
                          <button onClick={() => openModal('reject', row)} className="size-7 rounded-md flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"><XIcon className="size-3.5" /></button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>

    <LeaveActionModal
      open={modal.open}
      onOpenChange={closeModal}
      action={modal.action}
      leave={modal.leave}
      onConfirm={handleConfirm}
    />
  </div>
  )
}

export default AdminLeave
