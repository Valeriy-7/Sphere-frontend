import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { ServicesGetServicesQueryResponseType } from '../../types/services/ServicesGetServicesType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const servicesGetServicesQueryKey = () => [{ url: '/services/service' }] as const

export type ServicesGetServicesQueryKey = ReturnType<typeof servicesGetServicesQueryKey>

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export async function servicesGetServices(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesGetServicesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/service`,
    ...requestConfig,
  })
  return res.data
}

export function servicesGetServicesQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = servicesGetServicesQueryKey()
  return queryOptions<ServicesGetServicesQueryResponseType, ResponseErrorConfig<Error>, ServicesGetServicesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return servicesGetServices(config)
    },
  })
}

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export function useServicesGetServices<
  TData = ServicesGetServicesQueryResponseType,
  TQueryData = ServicesGetServicesQueryResponseType,
  TQueryKey extends QueryKey = ServicesGetServicesQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<ServicesGetServicesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? servicesGetServicesQueryKey()

  const query = useQuery({
    ...(servicesGetServicesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}