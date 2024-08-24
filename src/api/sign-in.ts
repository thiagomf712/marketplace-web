import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export async function apiSignIn({ email, password }: SignInBody) {
  return await api.post<SignInResponse>('/sellers/sessions', {
    email,
    password,
  })
}
