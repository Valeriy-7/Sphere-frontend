import client from '@/modules/auth/axios-client'
import type { FFStorageGetAllStorageDataQueryResponseType, FFStorageGetAllStorageData401Type } from '../../types/ff-account/FFStorageGetAllStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFStorageGetAllStorageDataQueryKey = () => [{ url: '/ff-account/storage/all' }] as const

export type FFStorageGetAllStorageDataQueryKey = ReturnType<typeof FFStorageGetAllStorageDataQueryKey>

/**
 * @description Returns comprehensive storage data including size-level information with factQuantity and defects from the original delivery data.
 * @summary Get all storage data with proper size information
 * {@link /ff-account/storage/all}
 */
export async function FFStorageGetAllStorageData(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFStorageGetAllStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetAllStorageData401Type>, unknown>({
    method: 'GET',
    url: `/ff-account/storage/all`,
    ...requestConfig,
  })
  return res.data
}

export function FFStorageGetAllStorageDataQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFStorageGetAllStorageDataQueryKey()
  return queryOptions<
    FFStorageGetAllStorageDataQueryResponseType,
    ResponseErrorConfig<FFStorageGetAllStorageData401Type>,
    FFStorageGetAllStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageGetAllStorageData(config)
    },
  })
}

/**
 * @description Returns comprehensive storage data including size-level information with factQuantity and defects from the original delivery data.
 * @summary Get all storage data with proper size information
 * {@link /ff-account/storage/all}
 */
export function useFFStorageGetAllStorageData<
  TData = FFStorageGetAllStorageDataQueryResponseType,
  TQueryData = FFStorageGetAllStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetAllStorageDataQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<FFStorageGetAllStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetAllStorageData401Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetAllStorageDataQueryKey()

  const query = useQuery({
    ...(FFStorageGetAllStorageDataQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<FFStorageGetAllStorageData401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}