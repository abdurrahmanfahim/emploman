import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-h-[80px] rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-[10px] font-outfit text-sm text-foreground placeholder:text-[#90A1B9] transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 resize-none",
        className
      )}
      {...props} />
  );
}

export { Textarea }
