import { CalendarIcon, ClockIcon } from 'lucide-react'
import { dummyAttendanceData, getWorkingHoursDisplay, getDayTypeDisplay } from '@/dummyData'

export const stats = [
  { title: 'Days Present',  value: dummyAttendanceData.length, icon: CalendarIcon },
  { title: 'Late Arrivals', value: 0,                          icon: ClockIcon    },
  { title: 'Avg. Work Hrs', value: `${(dummyAttendanceData.reduce((a, r) => a + (r.workingHours ?? 0), 0) / dummyAttendanceData.length).toFixed(1)} Hrs`, icon: ClockIcon },
]

export const attendance = dummyAttendanceData.map(r => {
  const { label: dayType, className: dayTypeClass } = getDayTypeDisplay(r)
  return {
    id: r._id,
    date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    checkIn: r.checkIn ? new Date(r.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null,
    checkOut: r.checkOut ? new Date(r.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null,
    workingHours: getWorkingHoursDisplay(r),
    isOngoing: r.checkIn && !r.checkOut,
    dayType,
    dayTypeClass,
    status: r.status,
  }
})

export const isWorking = dummyAttendanceData.some(r => r.checkIn && !r.checkOut)
