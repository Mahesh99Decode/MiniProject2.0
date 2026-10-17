import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white shadow-xs hover:bg-[var(--color-primary-hover)] active:scale-[0.99]",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700 active:scale-[0.99]",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] shadow-xs hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]",
        secondary:
          "bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-[var(--color-primary)] shadow-xs hover:bg-[var(--color-surface-soft)]",
        ghost:
          "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-base",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
