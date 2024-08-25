import { api } from '@/lib/axios'

export interface Category {
  id: string
  title: string
  slug: string
}

export interface CategoryResponse {
  categories: Category[]
}

export async function apiGetCategories() {
  const response = await api.get<CategoryResponse>('/categories')

  return response.data.categories
}
