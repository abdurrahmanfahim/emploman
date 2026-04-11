import { Link, useNavigate } from "react-router-dom"
import LoginLeft from "./LoginLeft"
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "@/dummyData";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const LoginForm = ({ role, title, subtitle }) => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: role === 'admin' ? 'admin@example.com' : 'johndoe@example.com',
      password: '123456',
    }
  })

  const onSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const userData = role === 'admin' ? dummyAdminDashboardData : dummyEmployeeDashboardData
    login(role.toUpperCase(), userData)
    setLoading(false)
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

          {/* ========== Form ========== */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* ========== Email input ========== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email address</label>
              <input
                type="email"
                {...register("email")}
                className="border border-gray-300 focus:outline-brand-accent rounded-sm p-2.5 w-full"
                placeholder="john@example.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* ========== Password input ========== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password")}
                  className="border border-gray-300 focus:outline-brand-accent rounded-sm p-2.5 w-full placeholder:translate-y-1 pr-11"
                  placeholder="********" />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {/* ========== Submit btn ========== */}
            <button type="submit"
              disabled={loading}
              className="w-full py-3 bg-surface-dark text-white rounded-md text-sm font-semibold hover:bg-surface-dark/90 disabled:opacity-50 transition-colors flex justify-center items-center cursor-pointer">
              {loading ? <Loader2Icon className='animate-spin size-4 mr-2' /> : 'Log in'}
            </button>

          </form>

        </div>
      </div>

    </div>
  )
}

export default LoginForm
