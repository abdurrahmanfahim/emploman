import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

import Layout from '@/components/layout/Layout'
import Login from '@/pages/Login'
import LoginForm from '@/components/login/LoginForm'
import NotFound from '@/pages/NotFound'
import PrintPayslip from '@/components/PrintPayslip'

// Employee pages
import EmployeeDashboard from '@/pages/employee/EmployeeDashboard'
import EmployeeAttendance from '@/pages/employee/EmployeeAttendance'
import EmployeeLeave from '@/pages/employee/EmployeeLeave'
import EmployeePayslip from '@/pages/employee/EmployeePayslip'
import EmployeeSettings from '@/pages/employee/EmployeeSettings'

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminEmployees from '@/pages/admin/Employees'
import AdminLeave from '@/pages/admin/AdminLeave'
import AdminPayslips from '@/pages/admin/AdminPayslips'
import AdminSettings from '@/pages/admin/AdminSettings'

const RootRedirect = () => {
  const { auth } = useAuth()
  if (!auth) return <Navigate to="/login" replace />
  return <Navigate to={auth.role === 'ADMIN' ? '/admin/dashboard' : '/employee/dashboard'} replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage your organization" />} />
        <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your workspace" />} />

        {/* Employee routes */}
        <Route element={<Layout />}>
          <Route path="/employee/dashboard"  element={<EmployeeDashboard />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/leave"      element={<EmployeeLeave />} />
          <Route path="/employee/payslips"   element={<EmployeePayslip />} />
          <Route path="/employee/settings"   element={<EmployeeSettings />} />
        </Route>

        {/* Admin routes */}
        <Route element={<Layout />}>
          <Route path="/admin/dashboard"  element={<AdminDashboard />} />
          <Route path="/admin/employees"  element={<AdminEmployees />} />
          <Route path="/admin/leave"      element={<AdminLeave />} />
          <Route path="/admin/payslips"   element={<AdminPayslips />} />
          <Route path="/admin/settings"   element={<AdminSettings />} />
        </Route>

        <Route path="/print/payslip/:id" element={<PrintPayslip />} />

        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
