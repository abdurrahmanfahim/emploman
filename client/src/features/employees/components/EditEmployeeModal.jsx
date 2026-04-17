import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SaveIcon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/lib/api'

const DEPARTMENTS = ['Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance', 'Operations', 'Customer Success', 'IT Support', 'Product Manager', 'Design']

const schema = z.object({
  firstName:        z.string().min(1, 'Required'),
  lastName:         z.string().min(1, 'Required'),
  email:            z.string().email('Invalid email'),
  phone:            z.string().min(5, 'Required'),
  position:         z.string().min(1, 'Required'),
  department:       z.string().min(1, 'Required'),
  basicSalary:      z.coerce.number().min(0),
  allowances:       z.coerce.number().min(0),
  deductions:       z.coerce.number().min(0),
  employmentStatus: z.enum(['ACTIVE', 'INACTIVE']),
  password:         z.string().optional(),
})

const EditEmployeeModal = ({ open, onOpenChange, employee, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (employee) {
      form.reset({
        firstName:        employee.firstName,
        lastName:         employee.lastName,
        email:            employee.email,
        phone:            employee.phone,
        position:         employee.position,
        department:       employee.department,
        basicSalary:      employee.basicSalary,
        allowances:       employee.allowances,
        deductions:       employee.deductions,
        employmentStatus: employee.employmentStatus,
        password:         '',
      })
    }
  }, [employee])

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      const payload = { ...data }
      if (!payload.password) delete payload.password
      await api.put(`/employees/${employee._id}`, payload)
      onSuccess?.()
      onOpenChange(false)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <UserIcon className="size-4 text-brand" />
            </div>
            <div>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>Update employee information</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([name, label]) => (
                <FormField key={name} control={form.control} name={name} render={({ field }) => (
                  <FormItem><FormLabel>{label}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="position" render={({ field }) => (
                <FormItem><FormLabel>Position</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                    <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[['basicSalary', 'Basic Salary'], ['allowances', 'Allowances'], ['deductions', 'Deductions']].map(([name, label]) => (
                <FormField key={name} control={form.control} name={name} render={({ field }) => (
                  <FormItem><FormLabel>{label}</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="employmentStatus" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem><FormLabel>New Password <span className="text-muted-foreground font-normal">(optional)</span></FormLabel><FormControl><Input type="password" placeholder="Leave blank to keep" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? 'Saving...' : <><SaveIcon className="size-3.5" /> Save Changes</>}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditEmployeeModal
