import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  LogisticsUpdateConsumableMutationRequestType,
  LogisticsUpdateConsumableMutationResponseType,
  LogisticsUpdateConsumablePathParamsType,
} from '../../types/services/LogisticsUpdateConsumableType'
import { useMutation } from '@tanstack/react-query'

export const logisticsUpdateConsumableMutationKey = () => [{ url: '/services/consumables/{id}' }] as const

export type LogisticsUpdateConsumableMutationKey = ReturnType<typeof logisticsUpdateConsumableMutationKey>

/**
 * @summary Обновление расходника
 * {@link /services/consumables/:id}
 */
export async function logisticsUpdateConsumable(
  id: LogisticsUpdateConsumablePathParamsType['id'],
  data: LogisticsUpdateConsumableMutationRequestType,
  config: Partial<RequestConfig<LogisticsUpdateConsumableMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<LogisticsUpdateConsumableMutationResponseType, ResponseErrorConfig<Error>, LogisticsUpdateConsumableMutationRequestType>({
    method: 'PUT',
    url: `/services/consumables/${id}`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Обновление расходника
 * {@link /services/consumables/:id}
 */
export function useLogisticsUpdateConsumable(
  options: {
    mutation?: UseMutationOptions<
      LogisticsUpdateConsumableMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: LogisticsUpdateConsumablePathParamsType['id']; data: LogisticsUpdateConsumableMutationRequestType }
    >
    client?: Partial<RequestConfig<LogisticsUpdateConsumableMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsUpdateConsumableMutationKey()

  return useMutation<
    LogisticsUpdateConsumableMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: LogisticsUpdateConsumablePathParamsType['id']; data: LogisticsUpdateConsumableMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return logisticsUpdateConsumable(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}