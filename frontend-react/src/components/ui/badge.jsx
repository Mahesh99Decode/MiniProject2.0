import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-white shadow-xs hover:bg-[var(--color-primary-hover)]",
        secondary:
          "border-[rgba(22,101,52,0.2)] bg-[var(--color-surface-soft)] text-[var(--color-primary)]",
        destructive:
          "border-transparent bg-red-600 text-white shadow-xs hover:bg-red-700",
        outline: "text-[var(--color-text-secondary)] border-[var(--color-border)]",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-800",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800",
        info:
          "border-blue-200 bg-blue-50 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
