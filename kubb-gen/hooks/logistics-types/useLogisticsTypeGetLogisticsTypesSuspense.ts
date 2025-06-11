import client from '@/modules/auth/axios-client'
import type { LogisticsTypeGetLogisticsTypesQueryResponseType } from '../../types/logistics-types/LogisticsTypeGetLogisticsTypesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const logisticsTypeGetLogisticsTypesSuspenseQueryKey = () => [{ url: '/logistics-types' }] as const

export type LogisticsTypeGetLogisticsTypesSuspenseQueryKey = ReturnType<typeof logisticsTypeGetLogisticsTypesSuspenseQueryKey>

/**
 * @summary Получить список типов логистики
 * {@link /logistics-types}
 */
export async function logisticsTypeGetLogisticsTypesSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsTypeGetLogisticsTypesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/logistics-types`,
    ...requestConfig,
  })
  return res.data
}

export function logisticsTypeGetLogisticsTypesSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = logisticsTypeGetLogisticsTypesSuspenseQueryKey()
  return queryOptions<
    LogisticsTypeGetLogisticsTypesQueryResponseType,
    ResponseErrorConfig<Error>,
    LogisticsTypeGetLogisticsTypesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logisticsTypeGetLogisticsTypesSuspense(config)
    },
  })
}

/**
 * @summary Получить список типов логистики
 * {@link /logistics-types}
 */
export function useLogisticsTypeGetLogisticsTypesSuspense<
  TData = LogisticsTypeGetLogisticsTypesQueryResponseType,
  TQueryData = LogisticsTypeGetLogisticsTypesQueryResponseType,
  TQueryKey extends QueryKey = LogisticsTypeGetLogisticsTypesSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<LogisticsTypeGetLogisticsTypesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logisticsTypeGetLogisticsTypesSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(logisticsTypeGetLogisticsTypesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}