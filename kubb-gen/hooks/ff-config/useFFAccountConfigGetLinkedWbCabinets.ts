import client from '@/modules/auth/axios-client'
import type { FFAccountConfigGetLinkedWbCabinetsQueryResponseType } from '../../types/ff-config/FFAccountConfigGetLinkedWbCabinetsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFAccountConfigGetLinkedWbCabinetsQueryKey = () => [{ url: '/ff-config/linked-wb-cabinets' }] as const

export type FFAccountConfigGetLinkedWbCabinetsQueryKey = ReturnType<typeof FFAccountConfigGetLinkedWbCabinetsQueryKey>

/**
 * @summary Get linked WB cabinet IDs for the current FF cabinet
 * {@link /ff-config/linked-wb-cabinets}
 */
export async function FFAccountConfigGetLinkedWbCabinets(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFAccountConfigGetLinkedWbCabinetsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-config/linked-wb-cabinets`,
    ...requestConfig,
  })
  return res.data
}

export function FFAccountConfigGetLinkedWbCabinetsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFAccountConfigGetLinkedWbCabinetsQueryKey()
  return queryOptions<
    FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
    ResponseErrorConfig<Error>,
    FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFAccountConfigGetLinkedWbCabinets(config)
    },
  })
}

/**
 * @summary Get linked WB cabinet IDs for the current FF cabinet
 * {@link /ff-config/linked-wb-cabinets}
 */
export function useFFAccountConfigGetLinkedWbCabinets<
  TData = FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
  TQueryData = FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
  TQueryKey extends QueryKey = FFAccountConfigGetLinkedWbCabinetsQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<FFAccountConfigGetLinkedWbCabinetsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountConfigGetLinkedWbCabinetsQueryKey()

  const query = useQuery({
    ...(FFAccountConfigGetLinkedWbCabinetsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}