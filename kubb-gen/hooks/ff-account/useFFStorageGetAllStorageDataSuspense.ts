import client from '@/modules/auth/axios-client'
import type { FFStorageGetAllStorageDataQueryResponseType, FFStorageGetAllStorageData401Type } from '../../types/ff-account/FFStorageGetAllStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFStorageGetAllStorageDataSuspenseQueryKey = () => [{ url: '/ff-account/storage/all' }] as const

export type FFStorageGetAllStorageDataSuspenseQueryKey = ReturnType<typeof FFStorageGetAllStorageDataSuspenseQueryKey>

/**
 * @description Returns comprehensive storage data including size-level information with factQuantity and defects from the original delivery data.
 * @summary Get all storage data with proper size information
 * {@link /ff-account/storage/all}
 */
export async function FFStorageGetAllStorageDataSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFStorageGetAllStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetAllStorageData401Type>, unknown>({
    method: 'GET',
    url: `/ff-account/storage/all`,
    ...requestConfig,
  })
  return res.data
}

export function FFStorageGetAllStorageDataSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFStorageGetAllStorageDataSuspenseQueryKey()
  return queryOptions<
    FFStorageGetAllStorageDataQueryResponseType,
    ResponseErrorConfig<FFStorageGetAllStorageData401Type>,
    FFStorageGetAllStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageGetAllStorageDataSuspense(config)
    },
  })
}

/**
 * @description Returns comprehensive storage data including size-level information with factQuantity and defects from the original delivery data.
 * @summary Get all storage data with proper size information
 * {@link /ff-account/storage/all}
 */
export function useFFStorageGetAllStorageDataSuspense<
  TData = FFStorageGetAllStorageDataQueryResponseType,
  TQueryData = FFStorageGetAllStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetAllStorageDataSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<FFStorageGetAllStorageDataQueryResponseType, ResponseErrorConfig<FFStorageGetAllStorageData401Type>, TData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetAllStorageDataSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(FFStorageGetAllStorageDataSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FFStorageGetAllStorageData401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}