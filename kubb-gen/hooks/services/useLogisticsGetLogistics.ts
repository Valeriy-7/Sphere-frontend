import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { LogisticsGetLogisticsQueryResponseType } from '../../types/services/LogisticsGetLogisticsType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const logisticsGetLogisticsQueryKey = () => [{ url: '/services/logistics' }] as const

export type LogisticsGetLogisticsQueryKey = ReturnType<typeof logisticsGetLogisticsQueryKey>

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export async function logisticsGetLogistics(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/logistics`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsGetLogisticsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsGetLogisticsQueryKey()
  return queryOptions<LogisticsGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, LogisticsGetLogisticsQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsGetLogistics(config)
    },
  })
}

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export function useLogisticsGetLogistics<
  TData = LogisticsGetLogisticsQueryResponseType,
  TQueryData = LogisticsGetLogisticsQueryResponseType,
  TQueryKey extends QueryKey = LogisticsGetLogisticsQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<LogisticsGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsGetLogisticsQueryKey()

  const query = useQuery({
    ...(logisticsGetLogisticsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}