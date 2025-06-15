import client from '@/modules/auth/axios-client'
import type { WbStorageGetWbStorageDataQueryResponseType, WbStorageGetWbStorageData401Type } from '../../types/wb/WbStorageGetWbStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const wbStorageGetWbStorageDataQueryKey = () => [{ url: '/wb/storage' }] as const

export type WbStorageGetWbStorageDataQueryKey = ReturnType<typeof wbStorageGetWbStorageDataQueryKey>

/**
 * @description Returns comprehensive storage data including summary statistics and detailed product information for the current WB cabinet.
 * @summary Get WB storage overview data
 * {@link /wb/storage}
 */
export async function wbStorageGetWbStorageData(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbStorageGetWbStorageDataQueryResponseType, ResponseErrorConfig<WbStorageGetWbStorageData401Type>, unknown>({
    method: 'GET',
    url: `/wb/storage`,
    ...requestConfig,
  })
  return res.data
}

export function wbStorageGetWbStorageDataQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = wbStorageGetWbStorageDataQueryKey()
  return queryOptions<
    WbStorageGetWbStorageDataQueryResponseType,
    ResponseErrorConfig<WbStorageGetWbStorageData401Type>,
    WbStorageGetWbStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbStorageGetWbStorageData(config)
    },
  })
}

/**
 * @description Returns comprehensive storage data including summary statistics and detailed product information for the current WB cabinet.
 * @summary Get WB storage overview data
 * {@link /wb/storage}
 */
export function useWbStorageGetWbStorageData<
  TData = WbStorageGetWbStorageDataQueryResponseType,
  TQueryData = WbStorageGetWbStorageDataQueryResponseType,
  TQueryKey extends QueryKey = WbStorageGetWbStorageDataQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<WbStorageGetWbStorageDataQueryResponseType, ResponseErrorConfig<WbStorageGetWbStorageData401Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbStorageGetWbStorageDataQueryKey()

  const query = useQuery({
    ...(wbStorageGetWbStorageDataQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<WbStorageGetWbStorageData401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}