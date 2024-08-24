import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { apiSignIn } from '@/api/sign-in'
import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
} from '@/assets/icons/huge-icons'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { AUTH_TOKEN_KEY } from '@/consts/localKeys'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'Digite um e-mail valido' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignInPage() {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const { mutateAsync: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: apiSignIn,
    onSuccess({ data }) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken)

      navigate('/')
    },
    onError() {
      toast.error('Usuário inválido')
    },
  })

  async function handleSignIn(data: SignInSchema) {
    await signIn({ email: data.email, password: data.password })
  }

  return (
    <>
      <Helmet title="Autenticação" />

      <div className="flex h-full flex-col rounded-4xl bg-white px-20 py-18">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col gap-12"
        >
          <header>
            <h2 className="mb-2 font-bold text-title-md text-gray-500">
              Acesse sua conta
            </h2>

            <p className="text-body-sm text-gray-300">
              Informe seu e-mail e senha para entrar
            </p>
          </header>

          <div className="flex flex-col gap-5">
            <Input
              Icon={Mail02Icon}
              type="email"
              placeholder="Seu e-mail cadastrado"
              label="E-mail"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              Icon={AccessIcon}
              type="password"
              placeholder="Sua senha de acesso"
              label="Senha"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <Button className="justify-between" disabled={isSigningIn}>
            Acessar
            <ArrowRight02Icon />
          </Button>
        </form>

        <div className="mt-auto">
          <p className="mb-5 text-gray-300">Ainda não tem uma conta?</p>

          <Button variant="outline" className="w-full justify-between" asChild>
            <Link to="/sign-up">
              Cadastrar
              <ArrowRight02Icon />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
