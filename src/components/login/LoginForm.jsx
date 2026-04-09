import { Link, useNavigate } from "react-router-dom"
import LoginLeft from "./LoginLeft"
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "@/dummyData";

const LoginForm = ({ role, title, subtitle }) => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: role === 'admin' ? 'admin@example.com' : 'johndoe@example.com',
    password: '123456',
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    showPassword: false
  });

  // ========= Input handler func =========
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ========= Password hide/show func =========
  const handleShowPassword = () => {
    setStatus((prev) => ({ ...prev, showPassword: !prev.showPassword }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(p => ({ ...p, loading: true, error: '' }))
    await new Promise(r => setTimeout(r, 600))
    const userData = role === 'admin' ? dummyAdminDashboardData : dummyEmployeeDashboardData
    login(role.toUpperCase(), userData)
    setStatus(p => ({ ...p, loading: false }))
    navigate(role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')
  }


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 shrink-0">
        <LoginLeft />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">

          {/* ========== Back Btn ========== */}
          <Link to='/login' className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary text-sm mb-10 transition-colors">
            <ArrowLeftIcon size={16} /> Back to portals
          </Link>

          {/* ========== Title & Subtitle ========== */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-800">{title}</h1>
            <p className="text-sm sm:text-base mt-2 text-gray-600">{subtitle}</p>
          </div>

          {/* ========== Error State ========== */}
          {status.error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3">
              <div className="size-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {status.error}
            </div>
          )}

          {/* ========== Form ========== */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* ========== Email input ========== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 focus:outline-brand-accent rounded-sm p-2.5 w-full"
                placeholder="john@example.com" />
            </div>

            {/* ========== Password input ========== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">

                <input
                  type={status.showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 focus:outline-brand-accent rounded-sm p-2.5 w-full placeholder:translate-y-1 pr-11" placeholder="********" />

                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                  {status.showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>

              </div>
            </div>

            {/* ========== Submit btn ========== */}
            <button type="submit"
              disabled={status.loading}
              className="w-full py-3 bg-surface-dark text-white rounded-md text-sm font-semibold hover:bg-surface-dark/90 disabled:opacity-50 transition-colors flex justify-center items-center cursor-pointer">
              {status.loading ? <Loader2Icon className='animate-spin size-4 mr-2' /> : 'Log in'}
            </button>

          </form>

        </div>
      </div>

    </div>
  )
}

export default LoginForm