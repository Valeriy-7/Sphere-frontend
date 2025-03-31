import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { LogisticsGetConsumablesQueryResponseType } from '../../types/services/LogisticsGetConsumablesType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const logisticsGetConsumablesQueryKey = () => [{ url: '/services/consumables' }] as const

export type LogisticsGetConsumablesQueryKey = ReturnType<typeof logisticsGetConsumablesQueryKey>

/**
 * @summary Получение списка расходников
 * {@link /services/consumables}
 */
export async function logisticsGetConsumables(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/consumables`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsGetConsumablesQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsGetConsumablesQueryKey()
  return queryOptions<LogisticsGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, LogisticsGetConsumablesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsGetConsumables(config)
    },
  })
}

/**
 * @summary Получение списка расходников
 * {@link /services/consumables}
 */
export function useLogisticsGetConsumables<
  TData = LogisticsGetConsumablesQueryResponseType,
  TQueryData = LogisticsGetConsumablesQueryResponseType,
  TQueryKey extends QueryKey = LogisticsGetConsumablesQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<LogisticsGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsGetConsumablesQueryKey()

  const query = useQuery({
    ...(logisticsGetConsumablesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}