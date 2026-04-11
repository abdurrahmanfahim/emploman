import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon, UserIcon } from 'lucide-react'
import LoginLeft from '@/components/login/LoginLeft'
import { ShieldIcon } from 'lucide-react'

const portals = [
  { label: 'Admin Portal',    role: 'admin',    icon: ShieldIcon, desc: 'Manage employees, payroll and operations' },
  { label: 'Employee Portal', role: 'employee', icon: UserIcon,   desc: 'View attendance, leaves and payslips'     },
]

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">

      <LoginLeft />

      {/* Right */}
      <div className="flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm space-y-6">

          <div>
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-1">Select your portal to continue.</p>
          </div>

          <div className="space-y-3">
            {portals.map(({ label, role, icon: Icon, desc }) => (
              <button key={role} onClick={() => navigate(`/login/${role}`)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-[rgba(226,232,240,0.7)] bg-card hover:border-brand/40 hover:bg-brand-muted/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-brand" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-brand transition-colors" />
              </button>
            ))}
          </div>

          <p className="text-xs text-center text-muted-foreground">© 2026 TalentNode. All rights reserved.</p>
        </div>
      </div>

    </div>
  )
}

export default Login
