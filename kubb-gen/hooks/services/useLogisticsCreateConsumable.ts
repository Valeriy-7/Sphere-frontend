import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  LogisticsCreateConsumableMutationRequestType,
  LogisticsCreateConsumableMutationResponseType,
} from '../../types/services/LogisticsCreateConsumableType'
import { useMutation } from '@tanstack/react-query'

export const logisticsCreateConsumableMutationKey = () => [{ url: '/services/consumables' }] as const

export type LogisticsCreateConsumableMutationKey = ReturnType<typeof logisticsCreateConsumableMutationKey>

/**
 * @summary Создание нового расходника
 * {@link /services/consumables}
 */
export async function logisticsCreateConsumable(
  data: LogisticsCreateConsumableMutationRequestType,
  config: Partial<RequestConfig<LogisticsCreateConsumableMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<LogisticsCreateConsumableMutationResponseType, ResponseErrorConfig<Error>, LogisticsCreateConsumableMutationRequestType>({
    method: 'POST',
    url: `/services/consumables`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Создание нового расходника
 * {@link /services/consumables}
 */
export function useLogisticsCreateConsumable(
  options: {
    mutation?: UseMutationOptions<
      LogisticsCreateConsumableMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: LogisticsCreateConsumableMutationRequestType }
    >
    client?: Partial<RequestConfig<LogisticsCreateConsumableMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsCreateConsumableMutationKey()

  return useMutation<LogisticsCreateConsumableMutationResponseType, ResponseErrorConfig<Error>, { data: LogisticsCreateConsumableMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return logisticsCreateConsumable(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}