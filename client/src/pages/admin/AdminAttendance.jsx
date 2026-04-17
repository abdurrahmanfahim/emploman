import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CalendarIcon } from 'lucide-react'
import api from '@/lib/api'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '@/dummyData'

const statusStyle = {
  PRESENT: 'bg-green-50 text-green-700 border-green-200',
  LATE:    'bg-yellow-50 text-yellow-700 border-yellow-200',
  ABSENT:  'bg-red-50 text-red-600 border-red-200',
}

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const fmtTime = (d) => d ? new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—'

const AdminAttendance = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState([])
  const [selectedEmp, setSelectedEmp] = useState('')

  useEffect(() => {
    api.get('/employees').then(r => setEmployees(r.data)).catch(console.error)
  }, [])

  useEffect(() => {
    setLoading(true)
    const url = selectedEmp ? `/attendance?employeeId=${selectedEmp}` : '/attendance'
    api.get(url).then(r => setRecords(r.data.data ?? [])).catch(console.error).finally(() => setLoading(false))
  }, [selectedEmp])

  const todayCount = records.filter(r => {
    const d = new Date(r.date)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length

  const lateCount = records.filter(r => r.status === 'LATE').length

  return (
    <div className="space-y-8">

      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold">Attendance</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor employee attendance records</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[["Today's Check-ins", todayCount], ['Total Records', records.length], ['Late Arrivals', lateCount]].map(([title, value]) => (
            <Card key={title} className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                  <CalendarIcon className="size-4 text-brand" />
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
        <div className="px-6 py-4 border-b border-[rgba(226,232,240,0.7)] flex items-center justify-between">
          <p className="font-outfit text-base font-semibold text-[#0F172B]">Attendance Records</p>
          <select
            value={selectedEmp}
            onChange={e => setSelectedEmp(e.target.value)}
            className="text-sm border border-[rgba(226,232,240,0.7)] rounded-md px-3 py-1.5 bg-background outline-none focus:border-brand"
          >
            <option value="">All Employees</option>
            {employees.map(e => <option key={e._id} value={e._id}>{e.firstName} {e.lastName}</option>)}
          </select>
        </div>
        <CardContent className="p-0">
          {loading ? <p className="text-sm text-muted-foreground p-6">Loading...</p> : (
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
                  {records.map((row) => {
                    const { label: dayType, className: dayTypeClass } = getDayTypeDisplay(row)
                    return (
                      <TableRow key={row._id} className="hover:bg-muted/30 transition-colors border-t border-[rgba(226,232,240,0.7)]">
                        <TableCell className="px-6 py-[17.75px] font-outfit font-medium text-sm text-[#0F172B]">{fmtDate(row.date)}</TableCell>
                        <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmtTime(row.checkIn)}</TableCell>
                        <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{fmtTime(row.checkOut)}</TableCell>
                        <TableCell className="px-6 py-[17.75px] font-outfit text-sm text-[#45556C]">{getWorkingHoursDisplay(row)}</TableCell>
                        <TableCell className="px-6 py-4">
                          <span className={`font-outfit text-xs rounded-md px-2.5 py-1 ${dayTypeClass}`}>{dayType}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge variant="outline" className={statusStyle[row.status] ?? ''}>{row.status}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

    </div>
  )
}

export default AdminAttendance
