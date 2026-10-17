import React from 'react'

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs transition-all duration-200 hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`flex items-center justify-between gap-3 mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h3 className={`text-base font-semibold leading-snug text-[var(--color-text-primary)] flex items-center gap-2 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className = '', children, ...props }) {
  return (
    <p className={`text-xs sm:text-sm font-normal leading-normal text-[var(--color-text-muted)] ${className}`} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`text-sm leading-relaxed text-[var(--color-text-secondary)] ${className}`} {...props}>
      {children}
    </div>
  )
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed gap-2"
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[0_4px_14px_rgba(22,101,52,0.2)] active:scale-[0.99]",
    secondary: "bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-[var(--color-primary)] hover:bg-[var(--color-surface-soft)] active:scale-[0.99]",
    outline: "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]",
    ghost: "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-semibold",
    md: "px-4 py-2 text-sm font-semibold",
    lg: "px-5 py-2.5 text-base font-semibold"
  }

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function Badge({ variant = 'neutral', className = '', children, ...props }) {
  const variants = {
    success: "bg-[var(--color-success-bg)] text-[var(--color-success)] border-[var(--color-success-border)]",
    warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-[var(--color-warning-border)]",
    error: "bg-[var(--color-error-bg)] text-[var(--color-error)] border-[var(--color-error-border)]",
    info: "bg-[var(--color-info-bg)] text-[var(--color-info)] border-[var(--color-info-border)]",
    neutral: "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
    primary: "bg-[var(--color-surface-soft)] text-[var(--color-primary)] border-[rgba(22,101,52,0.2)]"
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border leading-tight ${variants[variant] || variants.neutral} ${className}`} {...props}>
      {children}
    </span>
  )
}
