import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
} from '@/assets/icons/huge-icons'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'Digite um e-mail valido' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  function handleSignIn(data: SignInSchema) {
    console.log(data)
  }

  return (
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
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <Button className="justify-between">
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
  )
}
