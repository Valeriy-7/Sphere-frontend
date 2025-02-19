import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { ServicesGetConsumablesQueryResponseType } from '../../types/services/ServicesGetConsumablesType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const servicesGetConsumablesSuspenseQueryKey = () => [{ url: '/services/consumable' }] as const

export type ServicesGetConsumablesSuspenseQueryKey = ReturnType<typeof servicesGetConsumablesSuspenseQueryKey>

/**
 * @summary Получение списка расходников
 * {@link /services/consumable}
 */
export async function servicesGetConsumablesSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/consumable`,
    ...requestConfig,
  })
  return res.data
}

export function servicesGetConsumablesSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = servicesGetConsumablesSuspenseQueryKey()
  return queryOptions<ServicesGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, ServicesGetConsumablesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return servicesGetConsumablesSuspense(config)
    },
  })
}

/**
 * @summary Получение списка расходников
 * {@link /services/consumable}
 */
export function useServicesGetConsumablesSuspense<
  TData = ServicesGetConsumablesQueryResponseType,
  TQueryData = ServicesGetConsumablesQueryResponseType,
  TQueryKey extends QueryKey = ServicesGetConsumablesSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<ServicesGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? servicesGetConsumablesSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(servicesGetConsumablesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}