import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { ServicesGetConsumablesQueryResponseType } from '../../types/services/ServicesGetConsumablesType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const servicesGetConsumablesQueryKey = () => [{ url: '/services/consumable' }] as const

export type ServicesGetConsumablesQueryKey = ReturnType<typeof servicesGetConsumablesQueryKey>

/**
 * @summary Получение списка расходников
 * {@link /services/consumable}
 */
export async function servicesGetConsumables(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/consumable`,
    ...requestConfig,
  })
  return res.data
}

export function servicesGetConsumablesQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = servicesGetConsumablesQueryKey()
  return queryOptions<ServicesGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, ServicesGetConsumablesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return servicesGetConsumables(config)
    },
  })
}

/**
 * @summary Получение списка расходников
 * {@link /services/consumable}
 */
export function useServicesGetConsumables<
  TData = ServicesGetConsumablesQueryResponseType,
  TQueryData = ServicesGetConsumablesQueryResponseType,
  TQueryKey extends QueryKey = ServicesGetConsumablesQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<ServicesGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? servicesGetConsumablesQueryKey()

  const query = useQuery({
    ...(servicesGetConsumablesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}