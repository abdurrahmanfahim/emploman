import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FileTextIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/lib/api'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const schema = z.object({
  employeeId:  z.string().min(1, 'Required'),
  month:       z.coerce.number().min(1).max(12),
  year:        z.coerce.number().min(2000),
  basicSalary: z.coerce.number().min(0),
  allowances:  z.coerce.number().min(0),
  deductions:  z.coerce.number().min(0),
})

const CreatePayslipModal = ({ open, onOpenChange, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [employees, setEmployees] = useState([])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { employeeId: '', month: new Date().getMonth() + 1, year: new Date().getFullYear(), basicSalary: 0, allowances: 0, deductions: 0 },
  })

  useEffect(() => {
    if (open) api.get('/employees').then(r => setEmployees(r.data)).catch(() => {})
  }, [open])

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      await api.post('/payslip', data)
      onSuccess?.()
      onOpenChange(false)
      form.reset()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create payslip')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <FileTextIcon className="size-4 text-brand" />
            </div>
            <div>
              <DialogTitle>Create Payslip</DialogTitle>
              <DialogDescription>Generate a payslip for an employee</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="employeeId" render={({ field }) => (
              <FormItem>
                <FormLabel>Employee</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {employees.map(e => <SelectItem key={e._id} value={e._id}>{e.firstName} {e.lastName}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="month" render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <Select onValueChange={(v) => field.onChange(Number(v))} value={String(field.value)}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>{MONTHS.map((m, i) => <SelectItem key={i} value={String(i + 1)}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="year" render={({ field }) => (
                <FormItem><FormLabel>Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[['basicSalary', 'Basic Salary'], ['allowances', 'Allowances'], ['deductions', 'Deductions']].map(([name, label]) => (
                <FormField key={name} control={form.control} name={name} render={({ field }) => (
                  <FormItem><FormLabel>{label}</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? 'Creating...' : <><FileTextIcon className="size-3.5" /> Create Payslip</>}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePayslipModal
