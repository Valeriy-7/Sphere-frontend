import client from '@/modules/auth/axios-client'
import type { AttachmentsUploadImageMutationRequestType, AttachmentsUploadImageMutationResponseType } from '../../types/attachments/AttachmentsUploadImageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const attachmentsUploadImageMutationKey = () => [{ url: '/attachments/upload-image' }] as const

export type AttachmentsUploadImageMutationKey = ReturnType<typeof attachmentsUploadImageMutationKey>

/**
 * @summary Загрузить изображение
 * {@link /attachments/upload-image}
 */
export async function attachmentsUploadImage(
  data?: AttachmentsUploadImageMutationRequestType,
  config: Partial<RequestConfig<AttachmentsUploadImageMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || value instanceof Blob)) {
        formData.append(key, value)
      }
    })
  }
  const res = await request<AttachmentsUploadImageMutationResponseType, ResponseErrorConfig<Error>, AttachmentsUploadImageMutationRequestType>({
    method: 'POST',
    url: `/attachments/upload-image`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Загрузить изображение
 * {@link /attachments/upload-image}
 */
export function useAttachmentsUploadImage<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AttachmentsUploadImageMutationResponseType,
      ResponseErrorConfig<Error>,
      { data?: AttachmentsUploadImageMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<AttachmentsUploadImageMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? attachmentsUploadImageMutationKey()

  return useMutation<AttachmentsUploadImageMutationResponseType, ResponseErrorConfig<Error>, { data?: AttachmentsUploadImageMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return attachmentsUploadImage(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}