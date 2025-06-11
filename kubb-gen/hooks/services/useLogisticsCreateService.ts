import client from '@/modules/auth/axios-client'
import type { LogisticsCreateServiceMutationRequestType, LogisticsCreateServiceMutationResponseType } from '../../types/services/LogisticsCreateServiceType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const logisticsCreateServiceMutationKey = () => [{ url: '/services/service' }] as const

export type LogisticsCreateServiceMutationKey = ReturnType<typeof logisticsCreateServiceMutationKey>

/**
 * @summary Создание новой услуги
 * {@link /services/service}
 */
export async function logisticsCreateService(
  data: LogisticsCreateServiceMutationRequestType,
  config: Partial<RequestConfig<LogisticsCreateServiceMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<LogisticsCreateServiceMutationResponseType, ResponseErrorConfig<Error>, LogisticsCreateServiceMutationRequestType>({
    method: 'POST',
    url: `/services/service`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Создание новой услуги
 * {@link /services/service}
 */
export function useLogisticsCreateService<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsCreateServiceMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: LogisticsCreateServiceMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<LogisticsCreateServiceMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsCreateServiceMutationKey()

  return useMutation<LogisticsCreateServiceMutationResponseType, ResponseErrorConfig<Error>, { data: LogisticsCreateServiceMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return logisticsCreateService(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}