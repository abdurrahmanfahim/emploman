import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { LockIcon, SaveIcon, UserIcon } from 'lucide-react'
import ChangePasswordModal from '@/features/settings/components/ChangePasswordModal'
import api from '@/lib/api'

const EmployeeSettings = () => {
  const [pwModal, setPwModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get('/profile').then(r => {
      setProfile(r.data)
      setBio(r.data.bio || '')
    }).catch(console.error)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await api.post('/profile', { bio })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">

      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

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
              <Label>First Name</Label>
              <Input value={profile?.firstName || ''} disabled />
            </div>
            <div className="space-y-1.5">
              <Label>Last Name</Label>
              <Input value={profile?.lastName || ''} disabled />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={profile?.email || ''} disabled />
            </div>
            <div className="space-y-1.5">
              <Label>Position</Label>
              <Input value={profile?.position || ''} disabled />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Bio</Label>
            <Textarea rows={3} placeholder="Tell us a little about yourself..." value={bio} onChange={e => setBio(e.target.value)} />
            <p className="text-xs text-muted-foreground">This will be displayed on your profile.</p>
          </div>

          {saved && <p className="text-sm text-green-600">Profile updated successfully!</p>}

          <Separator />

          <div className="flex justify-end">
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <SaveIcon className="size-3.5" /> {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

        </CardContent>
      </Card>

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

export default EmployeeSettings
