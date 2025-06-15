import client from '@/modules/auth/axios-client'
import type { WbStorageGetWbStorageDataQueryResponseType, WbStorageGetWbStorageData401Type } from '../../types/wb/WbStorageGetWbStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const wbStorageGetWbStorageDataSuspenseQueryKey = () => [{ url: '/wb/storage' }] as const

export type WbStorageGetWbStorageDataSuspenseQueryKey = ReturnType<typeof wbStorageGetWbStorageDataSuspenseQueryKey>

/**
 * @description Returns comprehensive storage data including summary statistics and detailed product information for the current WB cabinet.
 * @summary Get WB storage overview data
 * {@link /wb/storage}
 */
export async function wbStorageGetWbStorageDataSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbStorageGetWbStorageDataQueryResponseType, ResponseErrorConfig<WbStorageGetWbStorageData401Type>, unknown>({
    method: 'GET',
    url: `/wb/storage`,
    ...requestConfig,
  })
  return res.data
}

export function wbStorageGetWbStorageDataSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = wbStorageGetWbStorageDataSuspenseQueryKey()
  return queryOptions<
    WbStorageGetWbStorageDataQueryResponseType,
    ResponseErrorConfig<WbStorageGetWbStorageData401Type>,
    WbStorageGetWbStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbStorageGetWbStorageDataSuspense(config)
    },
  })
}

/**
 * @description Returns comprehensive storage data including summary statistics and detailed product information for the current WB cabinet.
 * @summary Get WB storage overview data
 * {@link /wb/storage}
 */
export function useWbStorageGetWbStorageDataSuspense<
  TData = WbStorageGetWbStorageDataQueryResponseType,
  TQueryData = WbStorageGetWbStorageDataQueryResponseType,
  TQueryKey extends QueryKey = WbStorageGetWbStorageDataSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<WbStorageGetWbStorageDataQueryResponseType, ResponseErrorConfig<WbStorageGetWbStorageData401Type>, TData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbStorageGetWbStorageDataSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(wbStorageGetWbStorageDataSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<WbStorageGetWbStorageData401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}