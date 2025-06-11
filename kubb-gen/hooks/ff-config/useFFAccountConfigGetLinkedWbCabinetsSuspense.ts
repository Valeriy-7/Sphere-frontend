import client from '@/modules/auth/axios-client'
import type { FFAccountConfigGetLinkedWbCabinetsQueryResponseType } from '../../types/ff-config/FFAccountConfigGetLinkedWbCabinetsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFAccountConfigGetLinkedWbCabinetsSuspenseQueryKey = () => [{ url: '/ff-config/linked-wb-cabinets' }] as const

export type FFAccountConfigGetLinkedWbCabinetsSuspenseQueryKey = ReturnType<typeof FFAccountConfigGetLinkedWbCabinetsSuspenseQueryKey>

/**
 * @summary Get linked WB cabinet IDs for the current FF cabinet
 * {@link /ff-config/linked-wb-cabinets}
 */
export async function FFAccountConfigGetLinkedWbCabinetsSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFAccountConfigGetLinkedWbCabinetsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-config/linked-wb-cabinets`,
    ...requestConfig,
  })
  return res.data
}

export function FFAccountConfigGetLinkedWbCabinetsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFAccountConfigGetLinkedWbCabinetsSuspenseQueryKey()
  return queryOptions<
    FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
    ResponseErrorConfig<Error>,
    FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFAccountConfigGetLinkedWbCabinetsSuspense(config)
    },
  })
}

/**
 * @summary Get linked WB cabinet IDs for the current FF cabinet
 * {@link /ff-config/linked-wb-cabinets}
 */
export function useFFAccountConfigGetLinkedWbCabinetsSuspense<
  TData = FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
  TQueryData = FFAccountConfigGetLinkedWbCabinetsQueryResponseType,
  TQueryKey extends QueryKey = FFAccountConfigGetLinkedWbCabinetsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<FFAccountConfigGetLinkedWbCabinetsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountConfigGetLinkedWbCabinetsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(FFAccountConfigGetLinkedWbCabinetsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}