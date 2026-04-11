import { UsersIcon } from 'lucide-react'

const LoginLeft = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 lg:p-20 w-full h-full bg-surface-dark text-white">
            <div>
                {/* ========= Logo ========= */}
                <div className="w-fit text-white/70">
                    <UsersIcon className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="md:text-xl font-bold">Talent<span className="font-normal">Node</span></h3>
                </div>

                {/* ========= Title & Subtitle ========= */}
                <h1 className="text-4xl lg:text-5xl font-medium my-6 leading-tight tracking-tight">Employee <br /> Management System</h1>
                <p className="text-lg max-w-md leading-relaxed text-slate-400">Streamline your workforce operations, track attendance, manage payroll and empower your team securely.</p>
            </div>
        </div>
    )
}

export default LoginLeft
