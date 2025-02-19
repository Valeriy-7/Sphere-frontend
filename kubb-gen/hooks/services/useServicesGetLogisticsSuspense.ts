import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { ServicesGetLogisticsQueryResponseType } from '../../types/services/ServicesGetLogisticsType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const servicesGetLogisticsSuspenseQueryKey = () => [{ url: '/services/logistics' }] as const

export type ServicesGetLogisticsSuspenseQueryKey = ReturnType<typeof servicesGetLogisticsSuspenseQueryKey>

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export async function servicesGetLogisticsSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/logistics`,
    ...requestConfig,
  })
  return res.data
}

export function servicesGetLogisticsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = servicesGetLogisticsSuspenseQueryKey()
  return queryOptions<ServicesGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, ServicesGetLogisticsQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return servicesGetLogisticsSuspense(config)
    },
  })
}

/**
 * @summary Получение списка логистики
 * {@link /services/logistics}
 */
export function useServicesGetLogisticsSuspense<
  TData = ServicesGetLogisticsQueryResponseType,
  TQueryData = ServicesGetLogisticsQueryResponseType,
  TQueryKey extends QueryKey = ServicesGetLogisticsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<ServicesGetLogisticsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? servicesGetLogisticsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(servicesGetLogisticsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}