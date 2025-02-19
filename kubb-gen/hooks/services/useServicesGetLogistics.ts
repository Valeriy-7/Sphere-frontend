import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { ServicesGetLogisticsQueryResponseType } from '../../types/services/ServicesGetLogisticsType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const servicesGetLogisticsQueryKey = () => [{ url: '/services/logistics' }] as const

export type ServicesGetLogisticsQueryKey = ReturnType<typeof servicesGetLogisticsQueryKey>

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export async function servicesGetLogistics(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/logistics`,
    ...requestConfig,
  })
  return res.data
}

export function servicesGetLogisticsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = servicesGetLogisticsQueryKey()
  return queryOptions<ServicesGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, ServicesGetLogisticsQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return servicesGetLogistics(config)
    },
  })
}

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export function useServicesGetLogistics<
  TData = ServicesGetLogisticsQueryResponseType,
  TQueryData = ServicesGetLogisticsQueryResponseType,
  TQueryKey extends QueryKey = ServicesGetLogisticsQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<ServicesGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? servicesGetLogisticsQueryKey()

  const query = useQuery({
    ...(servicesGetLogisticsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}