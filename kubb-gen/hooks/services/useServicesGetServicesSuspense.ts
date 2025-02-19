import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { ServicesGetServicesQueryResponseType } from '../../types/services/ServicesGetServicesType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const servicesGetServicesSuspenseQueryKey = () => [{ url: '/services/service' }] as const

export type ServicesGetServicesSuspenseQueryKey = ReturnType<typeof servicesGetServicesSuspenseQueryKey>

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export async function servicesGetServicesSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesGetServicesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/service`,
    ...requestConfig,
  })
  return res.data
}

export function servicesGetServicesSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = servicesGetServicesSuspenseQueryKey()
  return queryOptions<ServicesGetServicesQueryResponseType, ResponseErrorConfig<Error>, ServicesGetServicesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return servicesGetServicesSuspense(config)
    },
  })
}

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export function useServicesGetServicesSuspense<
  TData = ServicesGetServicesQueryResponseType,
  TQueryData = ServicesGetServicesQueryResponseType,
  TQueryKey extends QueryKey = ServicesGetServicesSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<ServicesGetServicesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? servicesGetServicesSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(servicesGetServicesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}