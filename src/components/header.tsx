import { Link } from 'react-router-dom'

import {
  ChartHistogramIcon,
  PackageIcon,
  PlusSignIcon,
} from '@/assets/icons/huge-icons'

import logo from '../assets/logo.svg'
import { AccountMenu } from './account-menu'
import { Button } from './button'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="mb-16 flex h-20 items-center justify-between border-b border-b-shape px-5 py-4">
      <img src={logo} alt="" className="my-1 h-10 w-14" />

      <nav className="my-1 flex items-center gap-2">
        <NavLink to="/" Icon={ChartHistogramIcon}>
          Dashboard
        </NavLink>

        <NavLink to="/products" Icon={PackageIcon}>
          Produtos
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <Button size="sm" asChild>
          <Link to="/new-product">
            <PlusSignIcon />
            Novo produto
          </Link>
        </Button>

        <AccountMenu />
      </div>
    </header>
  )
}
