import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { stats, attendance, isWorking } from '@/features/attendance/attendanceData'
import { LogOutIcon } from 'lucide-react'

const statusStyle = {
  Late:        'bg-yellow-100 text-yellow-700 border-yellow-200',
  'In Progress': 'bg-brand-muted text-brand border-brand/20',
}

const Attendance = () => (
  <div className="space-y-6 pb-24">

    {/* Header */}
    <div>
      <h1 className="text-2xl font-semibold">Attendance</h1>
      <p className="text-sm text-muted-foreground mt-0.5">Track your work hours and daily check-ins</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ title, value, icon: Icon }) => (
        <Card key={title} className="shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <Icon className="size-4 text-brand" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{title}</p>
              <p className="text-2xl font-semibold mt-1 leading-none">{value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Recent Activity */}
    <Card className="shadow-none">
      <CardHeader className="px-6 py-4 border-b border-border">
        <CardTitle className="text-sm font-semibold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</TableHead>
                <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Check In</TableHead>
                <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Check Out</TableHead>
                <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Working Hours</TableHead>
                <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Day Type</TableHead>
                <TableHead className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-4 text-sm font-medium text-foreground">{row.date}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground">{row.checkIn}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-muted-foreground">{row.checkOut ?? '—'}</TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <span className="font-medium">{row.workingHours}</span>
                    {row.isOngoing && <span className="ml-1.5 text-xs text-muted-foreground">ongoing</span>}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline" className={statusStyle['In Progress']}>{row.dayType}</Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline" className={statusStyle[row.status] ?? ''}>{row.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>

    {/* Floating Clock Out */}
    {isWorking && (
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="sm" className="shadow-lg gap-2 pr-4">
          <LogOutIcon className="size-4" />
          <div className="text-left">
            <p className="text-xs font-semibold leading-none">Clock Out</p>
            <p className="text-[10px] opacity-70 mt-0.5">Click to end your shift</p>
          </div>
        </Button>
      </div>
    )}

  </div>
)

export default Attendance
