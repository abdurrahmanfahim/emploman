import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarIcon, FileTextIcon, UsersIcon, BuildingIcon } from 'lucide-react'
import api from '@/lib/api'

const AdminDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/dashboard').then(r => setData(r.data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  const statCards = [
    { title: 'Total Employees',    value: data?.totalEmployees,   icon: UsersIcon    },
    { title: 'Departments',        value: data?.totalDepartments, icon: BuildingIcon },
    { title: "Today's Attendance", value: data?.todayAttendance,  icon: CalendarIcon },
    { title: 'Pending Leaves',     value: data?.pendingLeaves,    icon: FileTextIcon },
  ]

  return (
    <div className="space-y-8">

      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, Admin — here's your overview</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

    </div>
  )
}

export default AdminDashboard
