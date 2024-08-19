import { Link, LinkProps, useLocation } from 'react-router-dom'

export interface NavLinkProps extends LinkProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export function NavLink({ Icon, children, ...props }: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      className="group flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-action-sm font-medium text-gray-300 hover:text-orange-base data-[current=true]:bg-shape data-[current=true]:text-orange-base"
      data-current={pathname === props.to}
      {...props}
    >
      <Icon className="size-5 text-gray-300 group-hover:text-orange-base group-data-[current=true]:text-orange-base" />

      {children}
    </Link>
  )
}
