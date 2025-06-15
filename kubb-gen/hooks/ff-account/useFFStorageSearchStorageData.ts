import client from '@/modules/auth/axios-client'
import type {
  FFStorageSearchStorageDataQueryResponseType,
  FFStorageSearchStorageDataQueryParamsType,
} from '../../types/ff-account/FFStorageSearchStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFStorageSearchStorageDataQueryKey = (params?: FFStorageSearchStorageDataQueryParamsType) =>
  [{ url: '/ff-account/storage/search' }, ...(params ? [params] : [])] as const

export type FFStorageSearchStorageDataQueryKey = ReturnType<typeof FFStorageSearchStorageDataQueryKey>

/**
 * @description Search storage data by supplier name/ID and apply quantity/defect filters with sorting
 * @summary Search and filter storage data
 * {@link /ff-account/storage/search}
 */
export async function FFStorageSearchStorageData(
  params?: FFStorageSearchStorageDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFStorageSearchStorageDataQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/storage/search`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function FFStorageSearchStorageDataQueryOptions(
  params?: FFStorageSearchStorageDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFStorageSearchStorageDataQueryKey(params)
  return queryOptions<FFStorageSearchStorageDataQueryResponseType, ResponseErrorConfig<Error>, FFStorageSearchStorageDataQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageSearchStorageData(params, config)
    },
  })
}

/**
 * @description Search storage data by supplier name/ID and apply quantity/defect filters with sorting
 * @summary Search and filter storage data
 * {@link /ff-account/storage/search}
 */
export function useFFStorageSearchStorageData<
  TData = FFStorageSearchStorageDataQueryResponseType,
  TQueryData = FFStorageSearchStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageSearchStorageDataQueryKey,
>(
  params?: FFStorageSearchStorageDataQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<FFStorageSearchStorageDataQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageSearchStorageDataQueryKey(params)

  const query = useQuery({
    ...(FFStorageSearchStorageDataQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}