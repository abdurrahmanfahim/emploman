import { CalendarIcon, ClockIcon } from 'lucide-react'

export const stats = [
  { title: 'Days Present',  value: 1,         icon: CalendarIcon },
  { title: 'Late Arrivals', value: 1,         icon: ClockIcon    },
  { title: 'Avg. Work Hrs', value: '8.5 Hrs', icon: ClockIcon    },
]

export const attendance = [
  {
    date: 'Mar 31, 2026',
    checkIn: '01:30 PM',
    checkOut: null,
    workingHours: '5h 27m',
    isOngoing: true,
    dayType: 'In Progress',
    status: 'Late',
  },
]

export const isWorking = true
