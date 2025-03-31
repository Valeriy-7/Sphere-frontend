import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { LogisticsProvidersGetLogisticsProvidersQueryResponseType } from '../../types/ff-account/LogisticsProvidersGetLogisticsProvidersType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const logisticsProvidersGetLogisticsProvidersSuspenseQueryKey = () => [{ url: '/ff-account/logistics-providers' }] as const

export type LogisticsProvidersGetLogisticsProvidersSuspenseQueryKey = ReturnType<typeof logisticsProvidersGetLogisticsProvidersSuspenseQueryKey>

/**
 * @description Возвращает список всех логистов, доступных для текущего кабинета.
 * @summary Получить список логистов
 * {@link /ff-account/logistics-providers}
 */
export async function logisticsProvidersGetLogisticsProvidersSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsProvidersGetLogisticsProvidersQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/logistics-providers`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsProvidersGetLogisticsProvidersSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsProvidersGetLogisticsProvidersSuspenseQueryKey()
  return queryOptions<
    LogisticsProvidersGetLogisticsProvidersQueryResponseType,
    ResponseErrorConfig<Error>,
    LogisticsProvidersGetLogisticsProvidersQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsProvidersGetLogisticsProvidersSuspense(config)
    },
  })
}

/**
 * @description Возвращает список всех логистов, доступных для текущего кабинета.
 * @summary Получить список логистов
 * {@link /ff-account/logistics-providers}
 */
export function useLogisticsProvidersGetLogisticsProvidersSuspense<
  TData = LogisticsProvidersGetLogisticsProvidersQueryResponseType,
  TQueryData = LogisticsProvidersGetLogisticsProvidersQueryResponseType,
  TQueryKey extends QueryKey = LogisticsProvidersGetLogisticsProvidersSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<LogisticsProvidersGetLogisticsProvidersQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsProvidersGetLogisticsProvidersSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(logisticsProvidersGetLogisticsProvidersSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}