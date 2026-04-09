import { Card, CardContent } from '@/components/ui/card'
import { dummyAdminDashboardData } from '@/dummyData'
import { CalendarIcon, FileTextIcon, UsersIcon, BuildingIcon } from 'lucide-react'

const { totalEmployees, totalDepartments, todayAttendance, pendingLeaves } = dummyAdminDashboardData

const statCards = [
  { title: 'Total Employees',    value: totalEmployees,   icon: UsersIcon    },
  { title: 'Departments',        value: totalDepartments, icon: BuildingIcon },
  { title: "Today's Attendance", value: todayAttendance,  icon: CalendarIcon },
  { title: 'Pending Leaves',     value: pendingLeaves,    icon: FileTextIcon },
]

const AdminDashboard = () => (
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
                <p className="text-2xl font-semibold leading-none mt-1">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  </div>
)

export default AdminDashboard
