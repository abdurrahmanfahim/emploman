import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { stats, attendance, isWorking } from '@/features/attendance/attendanceData'
import { LogOutIcon } from 'lucide-react'

const statusStyle = {
  PRESENT: 'bg-green-50 text-green-700 border-green-200',
  LATE:    'bg-yellow-50 text-yellow-700 border-yellow-200',
  ABSENT:  'bg-red-50 text-red-600 border-red-200',
}

const Attendance = () => (
  <div className="space-y-8 pb-24">

    <div className="pb-6 border-b border-border">
      <h1 className="text-2xl font-semibold">Attendance</h1>
      <p className="text-sm text-muted-foreground mt-1">Track your work hours and daily check-ins</p>
    </div>

    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <Card key={title} className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                <Icon className="size-4 text-brand" />
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
        <p className="font-outfit text-base font-semibold text-[#0F172B]">Recent Activity</p>
      </div>
      <CardContent className="p-0">
        <ScrollArea>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {['Date', 'Check In', 'Check Out', 'Working Hours', 'Day Type', 'Status'].map(h => (
                  <TableHead key={h} className="px-6 py-4 bg-[rgba(248,250,252,0.8)] font-outfit font-bold text-xs uppercase tracking-[0.6px] text-[#62748E]">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                  <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{row.date}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{row.checkIn}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit font-normal text-sm text-[#45556C]">{row.checkOut ?? '—'}</TableCell>
                  <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#45556C]">
                    {row.workingHours}
                    {row.isOngoing && <span className="ml-1.5 text-xs text-muted-foreground">ongoing</span>}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className={`font-outfit font-normal text-xs rounded-md px-2.5 py-1 ${row.dayTypeClass}`}>{row.dayType}</span>
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

    {isWorking && (
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="sm" className="shadow-md gap-2 pl-3 pr-4 h-10">
          <LogOutIcon className="size-4" />
          <div className="text-left">
            <p className="text-xs font-semibold leading-none">Clock Out</p>
            <p className="text-[10px] opacity-60 mt-0.5">Click to end your shift</p>
          </div>
        </Button>
      </div>
    )}

  </div>
)

export default Attendance
