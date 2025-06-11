import client from '@/modules/auth/axios-client'
import type { LogisticsGetConsumablesQueryResponseType } from '../../types/services/LogisticsGetConsumablesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const logisticsGetConsumablesSuspenseQueryKey = () => [{ url: '/services/consumables' }] as const

export type LogisticsGetConsumablesSuspenseQueryKey = ReturnType<typeof logisticsGetConsumablesSuspenseQueryKey>

/**
 * @summary Получение списка расходников
 * {@link /services/consumables}
 */
export async function logisticsGetConsumablesSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/consumables`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsGetConsumablesSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsGetConsumablesSuspenseQueryKey()
  return queryOptions<LogisticsGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, LogisticsGetConsumablesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsGetConsumablesSuspense(config)
    },
  })
}

/**
 * @summary Получение списка расходников
 * {@link /services/consumables}
 */
export function useLogisticsGetConsumablesSuspense<
  TData = LogisticsGetConsumablesQueryResponseType,
  TQueryData = LogisticsGetConsumablesQueryResponseType,
  TQueryKey extends QueryKey = LogisticsGetConsumablesSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<LogisticsGetConsumablesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsGetConsumablesSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(logisticsGetConsumablesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}