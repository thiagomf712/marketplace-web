import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Logout01Icon } from '@/assets/icons/huge-icons'

export function AccountMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="size-12 overflow-hidden rounded-xl">
          <img
            src="https://github.com/thiagomf712.png"
            className="h-full w-full object-cover"
            alt=""
          />

          <span className="sr-only">Menu do usuário</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="end"
        sideOffset={12}
        className="flex max-w-[180px] flex-col gap-5 rounded-xl bg-white p-4 shadow-sm"
      >
        <DropdownMenu.Label className="flex items-center gap-3">
          <img
            src="https://github.com/thiagomf712.png"
            alt=""
            className="size-8 rounded-lg object-cover"
          />

          <p className="break-words text-body-sm text-gray-300">
            Thiago Ferreira
          </p>
        </DropdownMenu.Label>

        <DropdownMenu.Separator className="h-px w-full bg-shape" />

        <DropdownMenu.Item asChild>
          <button className="flex items-center justify-between text-orange-base outline-none transition-colors hover:text-orange-dark">
            <span>Sair</span>

            <Logout01Icon className="size-5 text-orange-base" />
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
