import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EyeIcon, EyeOffIcon, KeyRoundIcon, LockIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schema = z.object({
  current:  z.string().min(1, 'Current password is required'),
  next:     z.string().min(8, 'Password must be at least 8 characters'),
  confirm:  z.string().min(1, 'Please confirm your password'),
}).refine(d => d.next === d.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
})

const PasswordInput = ({ field }) => {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input type={show ? 'text' : 'password'} {...field} className="pr-9" />
      <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
        {show ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
      </button>
    </div>
  )
}

const ChangePasswordModal = ({ open, onOpenChange }) => {
  const [loading, setLoading] = useState(false)

  const form = useForm({ resolver: zodResolver(schema), defaultValues: { current: '', next: '', confirm: '' } })

  const onSubmit = async (data) => {
    setLoading(true)
    console.log('Change password:', data)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <LockIcon className="size-4 text-brand" />
            </div>
            <div>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>Update your account password</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">

            {['current', 'next', 'confirm'].map((name, i) => (
              <FormField key={name} control={form.control} name={name} render={({ field }) => (
                <FormItem>
                  <FormLabel>{['Current Password', 'New Password', 'Confirm Password'][i]}</FormLabel>
                  <FormControl><PasswordInput field={field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            ))}

            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" size="sm" disabled={loading}>
                {loading ? 'Saving...' : <><KeyRoundIcon className="size-3.5" /> Update Password</>}
              </Button>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordModal
