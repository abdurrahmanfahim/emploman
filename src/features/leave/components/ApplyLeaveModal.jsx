import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon, SendIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const schema = z.object({
  type:     z.enum(['sick', 'casual', 'annual'], { required_error: 'Select a leave type' }),
  fromDate: z.date({ required_error: 'Select a start date' }),
  toDate:   z.date({ required_error: 'Select an end date' }),
  reason:   z.string().min(10, 'Reason must be at least 10 characters'),
}).refine(d => d.toDate >= d.fromDate, {
  message: 'End date must be after start date',
  path: ['toDate'],
})

const DatePicker = ({ value, onChange, placeholder, disabled }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className={cn('w-full justify-start font-normal', !value && 'text-muted-foreground')} disabled={disabled}>
        <CalendarIcon className="size-4 mr-2" />
        {value ? format(value, 'dd MMM yyyy') : placeholder}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
    </PopoverContent>
  </Popover>
)

const ApplyLeaveModal = ({ open, onOpenChange }) => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = {
      type: data.type,
      startDate: format(data.fromDate, 'yyyy-MM-dd'),
      endDate: format(data.toDate, 'yyyy-MM-dd'),
      reason: data.reason,
    }
    console.log('Submit payload:', payload)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
          <DialogDescription>Submit your leave request for approval</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">

            {/* Leave Type */}
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem>
                <FormLabel>Leave Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            {/* Duration */}
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="fromDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} placeholder="dd MMM yyyy" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="toDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} placeholder="dd MMM yyyy" disabled={!form.watch('fromDate')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Reason */}
            <FormField control={form.control} name="reason" render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Textarea placeholder="Briefly describe why you need this leave..." rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? 'Submitting...' : <><SendIcon className="size-3.5" /> Submit</>}
              </Button>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyLeaveModal
