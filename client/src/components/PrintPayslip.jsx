import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/lib/api'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const fmt = (n) => `$${Number(n).toLocaleString()}`

const PrintPayslip = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/payslip/${id}`).then(r => setData(r.data.data)).catch(console.error).finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (data) setTimeout(() => window.print(), 300)
  }, [data])

  if (loading) return <div className="flex items-center justify-center h-screen text-sm text-muted-foreground">Loading...</div>
  if (!data) return <div className="flex items-center justify-center h-screen text-sm text-red-500">Payslip not found.</div>

  const emp = data.employee
  const period = `${MONTHS[data.month - 1]} ${data.year}`

  return (
    <div className="min-h-screen bg-white p-10 print:p-8 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TalentNode</h1>
          <p className="text-sm text-gray-500 mt-0.5">Employee Management System</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">Payslip</p>
          <p className="text-sm text-gray-500">{period}</p>
        </div>
      </div>

      {/* Employee Info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Employee</p>
          <p className="font-semibold text-gray-900">{emp?.firstName} {emp?.lastName}</p>
          <p className="text-sm text-gray-500">{emp?.position}</p>
          <p className="text-sm text-gray-500">{emp?.department}</p>
          <p className="text-sm text-gray-500">{emp?.email}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Pay Period</p>
          <p className="font-semibold text-gray-900">{period}</p>
          <p className="text-sm text-gray-500">Join Date: {emp?.joinDate ? new Date(emp.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Salary Breakdown</p>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Description</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 text-gray-700">Basic Salary</td>
                <td className="px-4 py-3 text-right text-gray-900">{fmt(data.basicSalary)}</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 text-green-700">Allowances</td>
                <td className="px-4 py-3 text-right text-green-700">+ {fmt(data.allowances)}</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-3 text-red-600">Deductions</td>
                <td className="px-4 py-3 text-right text-red-600">- {fmt(data.deductions)}</td>
              </tr>
              <tr className="border-t-2 border-gray-300 bg-gray-50">
                <td className="px-4 py-3 font-bold text-gray-900">Net Salary</td>
                <td className="px-4 py-3 text-right font-bold text-gray-900">{fmt(data.netSalary)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-200 text-xs text-gray-400 text-center">
        This is a computer-generated payslip and does not require a signature. &copy; {new Date().getFullYear()} TalentNode.
      </div>

      {/* Print button - hidden on print */}
      <div className="mt-6 flex justify-center print:hidden">
        <button onClick={() => window.print()} className="px-6 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-700 transition-colors">
          Print / Save as PDF
        </button>
      </div>

    </div>
  )
}

export default PrintPayslip
