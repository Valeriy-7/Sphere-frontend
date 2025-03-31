import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  LogisticsProvidersUpdateLogisticsProviderMutationRequestType,
  LogisticsProvidersUpdateLogisticsProviderMutationResponseType,
  LogisticsProvidersUpdateLogisticsProviderPathParamsType,
  LogisticsProvidersUpdateLogisticsProvider404Type,
} from '../../types/ff-account/LogisticsProvidersUpdateLogisticsProviderType'
import { useMutation } from '@tanstack/react-query'

export const logisticsProvidersUpdateLogisticsProviderMutationKey = () => [{ url: '/ff-account/logistics-providers/{id}' }] as const

export type LogisticsProvidersUpdateLogisticsProviderMutationKey = ReturnType<typeof logisticsProvidersUpdateLogisticsProviderMutationKey>

/**
 * @description Обновляет информацию о существующем логисте. Можно обновить как все поля, так и отдельные.
 * @summary Обновить информацию о логисте
 * {@link /ff-account/logistics-providers/:id}
 */
export async function logisticsProvidersUpdateLogisticsProvider(
  id: LogisticsProvidersUpdateLogisticsProviderPathParamsType['id'],
  data?: LogisticsProvidersUpdateLogisticsProviderMutationRequestType,
  config: Partial<RequestConfig<LogisticsProvidersUpdateLogisticsProviderMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    LogisticsProvidersUpdateLogisticsProviderMutationResponseType,
    ResponseErrorConfig<LogisticsProvidersUpdateLogisticsProvider404Type>,
    LogisticsProvidersUpdateLogisticsProviderMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/logistics-providers/${id}`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет информацию о существующем логисте. Можно обновить как все поля, так и отдельные.
 * @summary Обновить информацию о логисте
 * {@link /ff-account/logistics-providers/:id}
 */
export function useLogisticsProvidersUpdateLogisticsProvider<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsProvidersUpdateLogisticsProviderMutationResponseType,
      ResponseErrorConfig<LogisticsProvidersUpdateLogisticsProvider404Type>,
      { id: LogisticsProvidersUpdateLogisticsProviderPathParamsType['id']; data?: LogisticsProvidersUpdateLogisticsProviderMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<LogisticsProvidersUpdateLogisticsProviderMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsProvidersUpdateLogisticsProviderMutationKey()

  return useMutation<
    LogisticsProvidersUpdateLogisticsProviderMutationResponseType,
    ResponseErrorConfig<LogisticsProvidersUpdateLogisticsProvider404Type>,
    { id: LogisticsProvidersUpdateLogisticsProviderPathParamsType['id']; data?: LogisticsProvidersUpdateLogisticsProviderMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return logisticsProvidersUpdateLogisticsProvider(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}