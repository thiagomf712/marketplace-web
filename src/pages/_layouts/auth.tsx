import { Outlet } from 'react-router-dom'

import authImg from '@/assets/auth.png'
import logo from '@/assets/logo.svg'

export function AuthLayout() {
  return (
    <div className="relative grid min-h-screen grid-cols-[1fr_600px] items-start bg-background antialiased">
      <div className="sticky top-0 h-screen">
        <header className="ml-10 mt-10 flex items-center gap-5">
          <img src={logo} alt="" />

          <div>
            <h1 className="mb-1 font-bold text-title-md text-gray-500">
              Marketplace
            </h1>

            <p className="text-gray-400">Painel de Vendedor</p>
          </div>
        </header>

        <img src={authImg} alt="" className="mt-14 max-h-[600px]" />
      </div>

      <div className="h-full p-6">
        <Outlet />
      </div>
    </div>
  )
}
