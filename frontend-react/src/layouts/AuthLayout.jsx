import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-[var(--color-bg)]">
      <Outlet />
    </div>
  )
}
