import client from '@/modules/auth/axios-client'
import type { FFStorageGetStorageDataQueryResponseType, FFStorageGetStorageData401Type } from '../../types/ff-account/FFStorageGetStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFStorageGetStorageDataQueryKey = () => [{ url: '/ff-account/storage' }] as const

export type FFStorageGetStorageDataQueryKey = ReturnType<typeof FFStorageGetStorageDataQueryKey>

/**
 * @description Returns comprehensive storage data including summary statistics and detailed supplier/product information for the current FF cabinet.
 * @summary Get storage overview data
 * {@link /ff-account/storage}
 */
export async function FFStorageGetStorageData(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFStorageGetStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetStorageData401Type>, unknown>({
    method: 'GET',
    url: `/ff-account/storage`,
    ...requestConfig,
  })
  return res.data
}

export function FFStorageGetStorageDataQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFStorageGetStorageDataQueryKey()
  return queryOptions<
    FFStorageGetStorageDataQueryResponseType,
    ResponseErrorConfig<FFStorageGetStorageData401Type>,
    FFStorageGetStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageGetStorageData(config)
    },
  })
}

/**
 * @description Returns comprehensive storage data including summary statistics and detailed supplier/product information for the current FF cabinet.
 * @summary Get storage overview data
 * {@link /ff-account/storage}
 */
export function useFFStorageGetStorageData<
  TData = FFStorageGetStorageDataQueryResponseType,
  TQueryData = FFStorageGetStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetStorageDataQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<FFStorageGetStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetStorageData401Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetStorageDataQueryKey()

  const query = useQuery({
    ...(FFStorageGetStorageDataQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<FFStorageGetStorageData401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}