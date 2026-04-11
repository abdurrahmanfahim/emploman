import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LockIcon } from 'lucide-react'
import ChangePasswordModal from '@/features/settings/components/ChangePasswordModal'

const AdminSettings = () => {
  const [pwModal, setPwModal] = useState(false)

  return (
    <div className="space-y-8">

      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

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

export default AdminSettings
