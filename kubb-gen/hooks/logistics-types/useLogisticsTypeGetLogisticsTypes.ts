import client from '@/modules/auth/axios-client'
import type { LogisticsTypeGetLogisticsTypesQueryResponseType } from '../../types/logistics-types/LogisticsTypeGetLogisticsTypesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const logisticsTypeGetLogisticsTypesQueryKey = () => [{ url: '/logistics-types' }] as const

export type LogisticsTypeGetLogisticsTypesQueryKey = ReturnType<typeof logisticsTypeGetLogisticsTypesQueryKey>

/**
 * @summary Получить список типов логистики
 * {@link /logistics-types}
 */
export async function logisticsTypeGetLogisticsTypes(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsTypeGetLogisticsTypesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/logistics-types`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsTypeGetLogisticsTypesQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsTypeGetLogisticsTypesQueryKey()
  return queryOptions<
    LogisticsTypeGetLogisticsTypesQueryResponseType,
    ResponseErrorConfig<Error>,
    LogisticsTypeGetLogisticsTypesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsTypeGetLogisticsTypes(config)
    },
  })
}

/**
 * @summary Получить список типов логистики
 * {@link /logistics-types}
 */
export function useLogisticsTypeGetLogisticsTypes<
  TData = LogisticsTypeGetLogisticsTypesQueryResponseType,
  TQueryData = LogisticsTypeGetLogisticsTypesQueryResponseType,
  TQueryKey extends QueryKey = LogisticsTypeGetLogisticsTypesQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<LogisticsTypeGetLogisticsTypesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsTypeGetLogisticsTypesQueryKey()

  const query = useQuery({
    ...(logisticsTypeGetLogisticsTypesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}