import client from '@/modules/auth/axios-client'
import type { FFStorageGetStorageDataQueryResponseType, FFStorageGetStorageData401Type } from '../../types/ff-account/FFStorageGetStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFStorageGetStorageDataSuspenseQueryKey = () => [{ url: '/ff-account/storage' }] as const

export type FFStorageGetStorageDataSuspenseQueryKey = ReturnType<typeof FFStorageGetStorageDataSuspenseQueryKey>

/**
 * @description Returns comprehensive storage data including summary statistics and detailed supplier/product information for the current FF cabinet.
 * @summary Get storage overview data
 * {@link /ff-account/storage}
 */
export async function FFStorageGetStorageDataSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFStorageGetStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetStorageData401Type>, unknown>({
    method: 'GET',
    url: `/ff-account/storage`,
    ...requestConfig,
  })
  return res.data
}

export function FFStorageGetStorageDataSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFStorageGetStorageDataSuspenseQueryKey()
  return queryOptions<
    FFStorageGetStorageDataQueryResponseType,
    ResponseErrorConfig<FFStorageGetStorageData401Type>,
    FFStorageGetStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageGetStorageDataSuspense(config)
    },
  })
}

/**
 * @description Returns comprehensive storage data including summary statistics and detailed supplier/product information for the current FF cabinet.
 * @summary Get storage overview data
 * {@link /ff-account/storage}
 */
export function useFFStorageGetStorageDataSuspense<
  TData = FFStorageGetStorageDataQueryResponseType,
  TQueryData = FFStorageGetStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetStorageDataSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<FFStorageGetStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetStorageData401Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetStorageDataSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(FFStorageGetStorageDataSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FFStorageGetStorageData401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}