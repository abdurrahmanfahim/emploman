import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'

const EmployeeDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/dashboard').then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  const emp = data?.employee
  const statCards = [
    { title: 'Days Present',   value: data?.currentMonthAttendance,                          icon: CalendarIcon   },
    { title: 'Pending Leaves', value: data?.pendingLeaves,                                   icon: FileTextIcon   },
    { title: 'Latest Payslip', value: data?.latestPayslip ? `$${Number(data.latestPayslip.netSalary).toLocaleString()}` : '—', icon: DollarSignIcon },
  ]

  return (
    <div className="space-y-8">

      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold">
          Welcome, {loading ? '...' : emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {emp?.position} &mdash; {emp?.department}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map(({ title, value, icon: Icon }) => (
            <Card key={title} className="border border-[rgba(226,232,240,0.7)] shadow-none py-0">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-brand" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{title}</p>
                  <p className="text-2xl font-semibold leading-none mt-1">{loading ? '—' : (value ?? 0)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick Actions</p>
        <div className="flex gap-3">
          <Button size="sm" onClick={() => navigate('/employee/attendance')}>
            Mark Attendance <ArrowRightIcon className="size-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate('/employee/leave')}>
            Apply for Leave
          </Button>
        </div>
      </div>

    </div>
  )
}

export default EmployeeDashboard
