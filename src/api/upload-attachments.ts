import { api } from '@/lib/axios'

export interface UploadAttachmentsBody {
  file: FileList
}

export interface UploadAttachmentsResponse {
  attachments: Array<{
    id: string
    url: string
  }>
}

export async function apiUploadAttachments({ file }: UploadAttachmentsBody) {
  const formData = new FormData()
  formData.append('files', file[0])

  const response = await api.post<UploadAttachmentsResponse>(
    '/attachments',
    formData,
  )

  return response.data.attachments[0]
}
