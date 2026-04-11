import { CheckIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const config = {
  approve: {
    title: 'Approve Leave',
    description: 'Are you sure you want to approve this leave request?',
    icon: CheckIcon,
    iconClass: 'bg-green-50 text-green-600',
    confirmClass: 'bg-green-600 hover:bg-green-700 text-white border-0',
    confirmLabel: 'Approve',
  },
  reject: {
    title: 'Reject Leave',
    description: 'Are you sure you want to reject this leave request?',
    icon: XIcon,
    iconClass: 'bg-red-50 text-red-600',
    confirmClass: 'bg-red-600 hover:bg-red-700 text-white border-0',
    confirmLabel: 'Reject',
  },
}

const LeaveActionModal = ({ open, onOpenChange, action, leave, onConfirm }) => {
  if (!action || !leave) return null
  const { title, description, icon: Icon, iconClass, confirmClass, confirmLabel } = config[action]

  const emp = Array.isArray(leave.employee) ? leave.employee[0] : leave.employee

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
              <Icon className="size-4" />
            </div>
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-muted/50 rounded-lg px-4 py-3 space-y-1 text-sm">
          <p><span className="text-muted-foreground">Employee:</span> <span className="font-medium">{emp?.firstName} {emp?.lastName}</span></p>
          <p><span className="text-muted-foreground">Type:</span> <span className="font-medium">{leave.type}</span></p>
          <p><span className="text-muted-foreground">Dates:</span> <span className="font-medium">{new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></p>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button size="sm" className={confirmClass} onClick={() => { onConfirm(action, leave._id); onOpenChange(false) }}>
            <Icon className="size-3.5" /> {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LeaveActionModal
