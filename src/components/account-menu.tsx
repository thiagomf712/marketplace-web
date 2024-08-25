import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { apiGetSellerProfile } from '@/api/get-seller-profile'
import { apiSignOut } from '@/api/sign-out'
import { Logout01Icon, UserIcon } from '@/assets/icons/huge-icons'
import { AUTH_TOKEN_KEY } from '@/consts/localKeys'
import { queryClient } from '@/lib/react-query'

import { Skeleton } from './skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: apiGetSellerProfile,
    staleTime: Infinity,
  })

  const { mutateAsync: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: apiSignOut,
    onMutate() {
      localStorage.removeItem(AUTH_TOKEN_KEY)

      queryClient.clear()

      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex size-12 items-center justify-center overflow-hidden rounded-xl">
          {profile?.avatar ? (
            <img
              src={profile.avatar.url}
              className="h-full w-full object-cover"
              alt=""
            />
          ) : (
            <UserIcon className="size-8 text-gray-300" />
          )}

          <span className="sr-only">Menu do usuário</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="end"
        sideOffset={12}
        className="flex w-[180px] flex-col gap-5 rounded-xl bg-white p-4 shadow-sm"
      >
        <DropdownMenu.Label className="flex items-center gap-3">
          {profile?.avatar ? (
            <img
              src={profile.avatar.url}
              alt=""
              className="size-8 rounded-lg object-cover"
            />
          ) : (
            <UserIcon className="size-8 text-gray-300" />
          )}

          {isLoadingProfile ? (
            <Skeleton className="h-4 w-20" />
          ) : (
            <p className="break-words text-body-sm text-gray-300">
              {profile?.name ?? 'Vendedor'}
            </p>
          )}
        </DropdownMenu.Label>
        <DropdownMenu.Separator className="h-px w-full bg-shape" />

        <DropdownMenu.Item asChild disabled={isSigningOut}>
          <button
            className="flex items-center justify-between text-orange-base outline-none transition-colors hover:text-orange-dark"
            onClick={() => signOut()}
          >
            <span>Sair</span>

            <Logout01Icon className="size-5 text-orange-base" />
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
