import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { LogisticsGetServicesQueryResponseType } from '../../types/services/LogisticsGetServicesType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const logisticsGetServicesQueryKey = () => [{ url: '/services/service' }] as const

export type LogisticsGetServicesQueryKey = ReturnType<typeof logisticsGetServicesQueryKey>

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export async function logisticsGetServices(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsGetServicesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/service`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsGetServicesQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsGetServicesQueryKey()
  return queryOptions<LogisticsGetServicesQueryResponseType, ResponseErrorConfig<Error>, LogisticsGetServicesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsGetServices(config)
    },
  })
}

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export function useLogisticsGetServices<
  TData = LogisticsGetServicesQueryResponseType,
  TQueryData = LogisticsGetServicesQueryResponseType,
  TQueryKey extends QueryKey = LogisticsGetServicesQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<LogisticsGetServicesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsGetServicesQueryKey()

  const query = useQuery({
    ...(logisticsGetServicesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}