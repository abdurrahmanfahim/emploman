import { Link, useNavigate } from "react-router-dom"
import LoginLeft from "./LoginLeft"
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/context/AuthContext"
import api from "@/lib/api"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const LoginForm = ({ role, title, subtitle }) => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', { ...data, role_type: role })
      login(res.data.user.role, res.data.user, res.data.token)
      navigate(role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 shrink-0">
        <LoginLeft />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">

          <Link to='/login' className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary text-sm mb-10 transition-colors">
            <ArrowLeftIcon size={16} /> Back to portals
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-800">{title}</h1>
            <p className="text-sm sm:text-base mt-2 text-gray-600">{subtitle}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email address</label>
              <input
                type="email"
                {...register("email")}
                className="border border-gray-300 focus:outline-brand-accent rounded-sm p-2.5 w-full"
                placeholder="john@example.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

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
