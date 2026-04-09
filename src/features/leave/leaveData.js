import { HeartPulseIcon, BriefcaseIcon, PalmtreeIcon } from 'lucide-react'
import { dummyLeaveData } from '@/dummyData'

const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const typeMap = {
  SICK:    { label: 'Sick',   icon: HeartPulseIcon },
  CASUAL:  { label: 'Casual', icon: BriefcaseIcon  },
  ANNUAL:  { label: 'Annual', icon: PalmtreeIcon   },
}

export const summary = [
  { type: 'Sick Leave',   taken: dummyLeaveData.filter(l => l.type === 'SICK').length,   icon: HeartPulseIcon },
  { type: 'Casual Leave', taken: dummyLeaveData.filter(l => l.type === 'CASUAL').length, icon: BriefcaseIcon  },
  { type: 'Annual Leave', taken: dummyLeaveData.filter(l => l.type === 'ANNUAL').length, icon: PalmtreeIcon   },
]

export const leaves = dummyLeaveData.map(l => ({
  id: l._id,
  type: typeMap[l.type]?.label ?? l.type,
  startDate: fmt(l.startDate),
  endDate: fmt(l.endDate),
  reason: l.reason,
  status: l.status.toLowerCase(),
}))

export const typeStyle = {
  Sick:   'bg-red-50 text-red-600 border-red-200',
  Casual: 'bg-blue-50 text-blue-600 border-blue-200',
  Annual: 'bg-green-50 text-green-700 border-green-200',
}

export const statusStyle = {
  approved: 'bg-green-50 text-green-700 border-green-200',
  pending:  'bg-yellow-50 text-yellow-700 border-yellow-200',
  rejected: 'bg-red-50 text-red-600 border-red-200',
}
