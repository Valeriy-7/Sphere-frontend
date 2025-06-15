import client from '@/modules/auth/axios-client'
import type {
  WbStorageSearchWbStorageDataQueryResponseType,
  WbStorageSearchWbStorageDataQueryParamsType,
} from '../../types/wb/WbStorageSearchWbStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const wbStorageSearchWbStorageDataQueryKey = (params?: WbStorageSearchWbStorageDataQueryParamsType) =>
  [{ url: '/wb/storage/search' }, ...(params ? [params] : [])] as const

export type WbStorageSearchWbStorageDataQueryKey = ReturnType<typeof wbStorageSearchWbStorageDataQueryKey>

/**
 * @description Search WB storage data by product name/article and apply quantity/defect filters with sorting
 * @summary Search and filter WB storage data
 * {@link /wb/storage/search}
 */
export async function wbStorageSearchWbStorageData(
  params?: WbStorageSearchWbStorageDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbStorageSearchWbStorageDataQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/storage/search`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function wbStorageSearchWbStorageDataQueryOptions(
  params?: WbStorageSearchWbStorageDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbStorageSearchWbStorageDataQueryKey(params)
  return queryOptions<
    WbStorageSearchWbStorageDataQueryResponseType,
    ResponseErrorConfig<Error>,
    WbStorageSearchWbStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbStorageSearchWbStorageData(params, config)
    },
  })
}

/**
 * @description Search WB storage data by product name/article and apply quantity/defect filters with sorting
 * @summary Search and filter WB storage data
 * {@link /wb/storage/search}
 */
export function useWbStorageSearchWbStorageData<
  TData = WbStorageSearchWbStorageDataQueryResponseType,
  TQueryData = WbStorageSearchWbStorageDataQueryResponseType,
  TQueryKey extends QueryKey = WbStorageSearchWbStorageDataQueryKey,
>(
  params?: WbStorageSearchWbStorageDataQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<WbStorageSearchWbStorageDataQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbStorageSearchWbStorageDataQueryKey(params)

  const query = useQuery({
    ...(wbStorageSearchWbStorageDataQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}