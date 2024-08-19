import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-screen-lg pb-20">
        <Outlet />
      </div>
    </div>
  )
}
