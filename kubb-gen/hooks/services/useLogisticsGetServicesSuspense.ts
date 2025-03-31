import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { LogisticsGetServicesQueryResponseType } from '../../types/services/LogisticsGetServicesType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const logisticsGetServicesSuspenseQueryKey = () => [{ url: '/services/service' }] as const

export type LogisticsGetServicesSuspenseQueryKey = ReturnType<typeof logisticsGetServicesSuspenseQueryKey>

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export async function logisticsGetServicesSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsGetServicesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/service`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsGetServicesSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsGetServicesSuspenseQueryKey()
  return queryOptions<LogisticsGetServicesQueryResponseType, ResponseErrorConfig<Error>, LogisticsGetServicesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsGetServicesSuspense(config)
    },
  })
}

/**
 * @summary Получение списка услуг
 * {@link /services/service}
 */
export function useLogisticsGetServicesSuspense<
  TData = LogisticsGetServicesQueryResponseType,
  TQueryData = LogisticsGetServicesQueryResponseType,
  TQueryKey extends QueryKey = LogisticsGetServicesSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<LogisticsGetServicesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsGetServicesSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(logisticsGetServicesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}