import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { LockIcon, SaveIcon, UserIcon } from 'lucide-react'
import ChangePasswordModal from '@/features/settings/components/ChangePasswordModal'

const Settings = () => {
  const [pwModal, setPwModal] = useState(false)
  const [profile, setProfile] = useState({
    fullName: 'Nasar Uddin',
    email: 'nasar@example.com',
    position: 'Sr Developer',
    bio: '',
  })

  const set = (k) => (e) => setProfile(p => ({ ...p, [k]: e.target.value }))

  return (
    <div className="space-y-8">

      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Public Profile */}
      <Card className="shadow-none py-0">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
            <UserIcon className="size-4 text-brand" />
          </div>
          <p className="text-sm font-semibold">Public Profile</p>
        </div>
        <CardContent className="p-6 space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input value={profile.fullName} onChange={set('fullName')} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={profile.email} onChange={set('email')} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Position</Label>
            <Input value={profile.position} onChange={set('position')} />
          </div>

          <div className="space-y-1.5">
            <Label>Bio</Label>
            <Textarea rows={3} placeholder="Tell us a little about yourself..." value={profile.bio} onChange={set('bio')} />
            <p className="text-xs text-muted-foreground">This will be displayed on your profile.</p>
          </div>

          <Separator />

          <div className="flex justify-end">
            <Button size="sm"><SaveIcon className="size-3.5" /> Save Changes</Button>
          </div>

        </CardContent>
      </Card>

      {/* Password */}
      <Card className="shadow-none max-w-sm py-0">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-brand-muted flex items-center justify-center shrink-0">
              <LockIcon className="size-4 text-brand" />
            </div>
            <div>
              <p className="text-sm font-semibold">Password</p>
              <p className="text-xs text-muted-foreground mt-0.5">Update your account password</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setPwModal(true)}>Change</Button>
        </CardContent>
      </Card>
      <ChangePasswordModal open={pwModal} onOpenChange={setPwModal} />

    </div>
  )
}

export default Settings
