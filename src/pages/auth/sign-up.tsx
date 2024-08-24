import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  Mail02Icon,
  UserIcon,
} from '@/assets/icons/huge-icons'
import { Button } from '@/components/button'
import { FileUploadInput } from '@/components/file-upload'
import { Input } from '@/components/input'

const signUpSchema = z
  .object({
    image: z
      .custom<FileList>()
      .refine((file) => file[0] != null, { message: 'Campo obrigatório' })
      .refine(
        (file) => !file[0] || (!!file[0] && file[0].size <= 5 * 1024 * 1024),
        {
          message: 'O tamanho da imagem deve ser menor que 5MB',
        },
      )
      .refine(
        (file) => !file[0] || (!!file[0] && file[0].type?.startsWith('image')),
        {
          message: 'Somente imagens são permitidas',
        },
      ),
    name: z.string().min(1, { message: 'Campo obrigatório' }),
    cellphone: z
      .string()
      .min(1, { message: 'Campo obrigatório' })
      .regex(/^([1-9]{2}) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/, {
        message: 'Digite um número de celular válido (00) 00000-0000',
      }),
    email: z
      .string()
      .min(1, { message: 'Campo obrigatório' })
      .email({ message: 'Digite um e-mail valido' }),
    password: z.string().min(1, { message: 'Campo obrigatório' }),
    confirmPassword: z.string().min(1, { message: 'Campo obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas estão diferentes',
    path: ['confirmPassword'],
  })

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUpPage() {
  const {
    formState: { errors },
    register,
    watch,
    handleSubmit,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const imgFile = watch('image')

  function handleSignUp(data: SignUpSchema) {
    console.log(data)
  }

  return (
    <div className="flex flex-col rounded-4xl bg-white px-20 py-18">
      <form
        className="flex flex-col gap-12"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <header>
          <h2 className="mb-2 font-bold text-title-md text-gray-500">
            Crie sua conta
          </h2>

          <p className="text-body-sm text-gray-300">
            Informe os seus dados pessoais e de acesso
          </p>
        </header>

        <section className="flex flex-col gap-5">
          <h3 className="font-bold text-title-sm">Perfil</h3>

          <FileUploadInput
            error={errors.image?.message}
            previewFile={imgFile}
            accept="image/*"
            {...register('image')}
          />

          <Input
            type="text"
            placeholder="Seu nome completo"
            label="Nome"
            error={errors.name?.message}
            Icon={UserIcon}
            {...register('name')}
          />

          <Input
            type="text"
            placeholder="(00) 00000-0000"
            label="Celular"
            error={errors.cellphone?.message}
            Icon={CallIcon}
            {...register('cellphone')}
          />
        </section>

        <section className="flex flex-col gap-5">
          <h3 className="font-bold text-title-sm">Acesso</h3>

          <Input
            type="email"
            placeholder="Seu e-mail"
            label="E-mail"
            error={errors.email?.message}
            Icon={Mail02Icon}
            {...register('email')}
          />

          <Input
            type="password"
            placeholder="Sua senha"
            label="Senha"
            Icon={AccessIcon}
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            type="password"
            placeholder="Confirme sua senha"
            label="Confirmação de senha"
            Icon={AccessIcon}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </section>

        <Button className="justify-between">
          Cadastrar
          <ArrowRight02Icon />
        </Button>
      </form>

      <div className="mt-20">
        <p className="mb-5 text-gray-300">Já tem uma conta?</p>

        <Button variant="outline" className="w-full justify-between" asChild>
          <Link to="/sign-in">
            Acessar
            <ArrowRight02Icon />
          </Link>
        </Button>
      </div>
    </div>
  )
}
