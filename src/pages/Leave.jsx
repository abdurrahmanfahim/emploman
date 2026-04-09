import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { summary, leaves, statusStyle, typeStyle } from '@/features/leave/leaveData'
import ApplyLeaveModal from '@/features/leave/components/ApplyLeaveModal'
import { PlusIcon } from 'lucide-react'

const Leave = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
  <div className="space-y-6">

    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Leave Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your leave history and requests</p>
      </div>
      <Button size="sm" onClick={() => setModalOpen(true)}><PlusIcon className="size-4" /> Apply for Leave</Button>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {summary.map(({ type, taken, icon: Icon }) => (
        <Card key={type} className="shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <Icon className="size-4 text-brand" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{type}</p>
              <p className="text-2xl font-semibold leading-none mt-1">{taken} <span className="text-sm font-normal text-muted-foreground">taken</span></p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Leave History */}
    <Card className="shadow-none">
      <div className="px-6 py-4 border-b border-border">
        <p className="text-sm font-semibold">Leave History</p>
      </div>
      <CardContent className="p-0">
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {['Type', 'Dates', 'Reason', 'Status'].map(h => (
                  <TableHead key={h} className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-4 text-sm font-medium">
                    <Badge variant="outline" className={typeStyle[row.type] ?? 'bg-muted text-muted-foreground border-border'}>{row.type}</Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-muted-foreground">{row.startDate} – {row.endDate}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-muted-foreground">{row.reason}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline" className={statusStyle[row.status]}>
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>

    <ApplyLeaveModal open={modalOpen} onOpenChange={setModalOpen} />
  </div>
  )
}

export default Leave
