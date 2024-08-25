import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { AUTH_TOKEN_KEY } from '@/consts/localKeys'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    if (!token) {
      navigate('/sign-in', { replace: true })
    }
  }, [navigate])

  // useEffect(() => {
  //   const interceptorId = api.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (isAxiosError(error)) {
  //         const status = error.response?.status
  //         const code = error.response?.data.code

  //         if (status === 401 && code === 'UNAUTHORIZED') {
  //           navigate('/sign-in', { replace: true })
  //         } else {
  //           throw error
  //         }
  //       }
  //     },
  //   )

  //   return () => {
  //     api.interceptors.response.eject(interceptorId)
  //   }
  // }, [navigate])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-screen-lg pb-20">
        <Outlet />
      </div>
    </div>
  )
}
