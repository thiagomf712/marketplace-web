import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { DashboardPage } from './pages/app/dashboard/dashboard'
import { NewProductPage } from './pages/app/new-product'
import { ProductsPage } from './pages/app/products'
import { SignInPage } from './pages/auth/sign-in'
import { SignUpPage } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'new-product', element: <NewProductPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
    ],
  },
])
