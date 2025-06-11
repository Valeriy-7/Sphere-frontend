import client from '@/modules/auth/axios-client'
import type { LogisticsGetLogisticsQueryResponseType } from '../../types/services/LogisticsGetLogisticsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const logisticsGetLogisticsSuspenseQueryKey = () => [{ url: '/services/logistics' }] as const

export type LogisticsGetLogisticsSuspenseQueryKey = ReturnType<typeof logisticsGetLogisticsSuspenseQueryKey>

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export async function logisticsGetLogisticsSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/logistics`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsGetLogisticsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsGetLogisticsSuspenseQueryKey()
  return queryOptions<LogisticsGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, LogisticsGetLogisticsQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsGetLogisticsSuspense(config)
    },
  })
}

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export function useLogisticsGetLogisticsSuspense<
  TData = LogisticsGetLogisticsQueryResponseType,
  TQueryData = LogisticsGetLogisticsQueryResponseType,
  TQueryKey extends QueryKey = LogisticsGetLogisticsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<LogisticsGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsGetLogisticsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(logisticsGetLogisticsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}