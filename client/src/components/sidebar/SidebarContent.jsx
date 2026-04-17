import { FileTextIcon, SettingsIcon, XIcon, LogOutIcon, ChevronRightIcon, DollarSignIcon, CalendarIcon, UserIcon, LayoutGridIcon, UsersIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const SidebarContent = ({ pathname, setMobileOpen }) => {
    const { auth, logout } = useAuth()
    const navigate = useNavigate()
    const role = auth?.role ?? 'EMPLOYEE'
    const username = auth?.user?.employee
      ? `${auth.user.employee.firstName} ${auth.user.employee.lastName}`
      : role === 'ADMIN' ? 'Admin' : 'Employee'

    const employeeNav = [
        { name: "Dashboard", href: "/employee/dashboard",  icon: LayoutGridIcon },
        { name: "Attendance", href: "/employee/attendance", icon: CalendarIcon   },
        { name: "Leave",      href: "/employee/leave",      icon: FileTextIcon   },
        { name: "Payslips",   href: "/employee/payslips",   icon: DollarSignIcon },
        { name: "Settings",   href: "/employee/settings",   icon: SettingsIcon   },
    ]

    const adminNav = [
        { name: "Dashboard",  href: "/admin/dashboard",   icon: LayoutGridIcon },
        { name: "Employees",  href: "/admin/employees",   icon: UserIcon       },
        { name: "Attendance", href: "/admin/attendance",  icon: CalendarIcon   },
        { name: "Leave",      href: "/admin/leave",       icon: FileTextIcon   },
        { name: "Payslips",   href: "/admin/payslips",    icon: DollarSignIcon },
        { name: "Settings",   href: "/admin/settings",    icon: SettingsIcon   },
    ]

    const navItems = role === 'ADMIN' ? adminNav : employeeNav

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <>
            {/* ========= Brand header ========= */}
            <div className="px-5 pt-6 pb-5 border-b border-sidebar-border">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-3'>
                        <div className='size-10 rounded-lg bg-brand flex items-center justify-center shrink-0'>
                            <UsersIcon className='size-5 text-white' />
                        </div>
                        <div>
                            <h5 className='font-semibold text-sm text-sidebar-fg tracking-wide'>TalentNode</h5>
                            <p className='text-xs text-sidebar-muted-fg'>Employee Management</p>
                        </div>
                    </div>
                    <button onClick={() => setMobileOpen(false)} className='lg:hidden text-sidebar-muted-fg hover:text-sidebar-fg p-1'>
                        <XIcon size={18} />
                    </button>
                </div>
            </div>

            {/* ========= User Profile Card ========= */}
            {username &&
                <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-sidebar-muted border border-sidebar-border'>
                    <div className="flex items-center gap-3">
                        <div className='size-9 rounded-lg bg-brand-muted flex items-center justify-center shrink-0'>
                            <span className='text-brand text-xs font-semibold'>
                                {username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className='min-w-0'>
                            <p className='text-sm font-medium text-sidebar-fg truncate'>{username}</p>
                            <p className='text-xs text-sidebar-muted-fg truncate'>{role === 'ADMIN' ? 'Administrator' : 'Employee'}</p>
                        </div>
                    </div>
                </div>
            }

            {/* ========= Section label ========= */}
            <div className='px-5 pt-5 pb-2'>
                <p className='text-xs font-semibold uppercase tracking-widest text-sidebar-muted-fg'>Navigation</p>
            </div>

            {/* ========= Navigation List ========= */}
            <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                        <Link key={item.name} to={item.href} className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 relative ${isActive ? 'bg-brand/15 text-brand' : 'text-sidebar-muted-fg hover:text-sidebar-fg hover:bg-sidebar-muted'}`}>

                            {/* active mark */}
                            {isActive && <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-brand' />}

                            {/* icon */}
                            <item.icon className={`size-4 shrink-0 ${isActive ? 'text-brand' : 'text-sidebar-muted-fg group-hover:text-sidebar-fg'}`} />

                            {/* name */}
                            <span className='flex-1'>{item.name}</span>
                            {isActive && <ChevronRightIcon className='size-3.5 text-brand/50' />}
                        </Link>
                    )
                })}
            </div>

            {/* ========= Logout btn ========= */}
            <div className='p-3 border-t border-sidebar-border'>
                <button onClick={handleLogout} className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-muted-fg hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer'>
                    <LogOutIcon className='size-4' />
                    <span>Log out</span>
                </button>
            </div>
        </>
    )
}

export default SidebarContent