import { HeartPulseIcon, BriefcaseIcon, PalmtreeIcon } from 'lucide-react'

export const summary = [
  { type: 'Sick Leave',   taken: 0, icon: HeartPulseIcon },
  { type: 'Casual Leave', taken: 1, icon: BriefcaseIcon  },
  { type: 'Annual Leave', taken: 0, icon: PalmtreeIcon   },
]

export const leaves = [
  {
    id: '1',
    type: 'Casual',
    startDate: 'Apr 02, 2026',
    endDate: 'Apr 03, 2026',
    reason: 'Just a casual leave',
    status: 'approved',
  },
]

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
