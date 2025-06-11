import client from '@/modules/auth/axios-client'
import type { AttachmentsUploadVoiceMutationRequestType, AttachmentsUploadVoiceMutationResponseType } from '../../types/attachments/AttachmentsUploadVoiceType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const attachmentsUploadVoiceMutationKey = () => [{ url: '/attachments/upload-voice' }] as const

export type AttachmentsUploadVoiceMutationKey = ReturnType<typeof attachmentsUploadVoiceMutationKey>

/**
 * @summary Загрузить голосовое сообщение
 * {@link /attachments/upload-voice}
 */
export async function attachmentsUploadVoice(
  data?: AttachmentsUploadVoiceMutationRequestType,
  config: Partial<RequestConfig<AttachmentsUploadVoiceMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<AttachmentsUploadVoiceMutationResponseType, ResponseErrorConfig<Error>, AttachmentsUploadVoiceMutationRequestType>({
    method: 'POST',
    url: `/attachments/upload-voice`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Загрузить голосовое сообщение
 * {@link /attachments/upload-voice}
 */
export function useAttachmentsUploadVoice<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AttachmentsUploadVoiceMutationResponseType,
      ResponseErrorConfig<Error>,
      { data?: AttachmentsUploadVoiceMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<AttachmentsUploadVoiceMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? attachmentsUploadVoiceMutationKey()

  return useMutation<AttachmentsUploadVoiceMutationResponseType, ResponseErrorConfig<Error>, { data?: AttachmentsUploadVoiceMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return attachmentsUploadVoice(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}