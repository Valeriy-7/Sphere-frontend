import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  LogisticsUpdateServiceMutationRequestType,
  LogisticsUpdateServiceMutationResponseType,
  LogisticsUpdateServicePathParamsType,
} from '../../types/services/LogisticsUpdateServiceType'
import { useMutation } from '@tanstack/react-query'

export const logisticsUpdateServiceMutationKey = () => [{ url: '/services/service/{id}' }] as const

export type LogisticsUpdateServiceMutationKey = ReturnType<typeof logisticsUpdateServiceMutationKey>

/**
 * @summary Обновление услуги
 * {@link /services/service/:id}
 */
export async function logisticsUpdateService(
  id: LogisticsUpdateServicePathParamsType['id'],
  data: LogisticsUpdateServiceMutationRequestType,
  config: Partial<RequestConfig<LogisticsUpdateServiceMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<LogisticsUpdateServiceMutationResponseType, ResponseErrorConfig<Error>, LogisticsUpdateServiceMutationRequestType>({
    method: 'PUT',
    url: `/services/service/${id}`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Обновление услуги
 * {@link /services/service/:id}
 */
export function useLogisticsUpdateService<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsUpdateServiceMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: LogisticsUpdateServicePathParamsType['id']; data: LogisticsUpdateServiceMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<LogisticsUpdateServiceMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsUpdateServiceMutationKey()

  return useMutation<
    LogisticsUpdateServiceMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: LogisticsUpdateServicePathParamsType['id']; data: LogisticsUpdateServiceMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return logisticsUpdateService(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}