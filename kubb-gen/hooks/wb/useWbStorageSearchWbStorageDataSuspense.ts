import client from '@/modules/auth/axios-client'
import type {
  WbStorageSearchWbStorageDataQueryResponseType,
  WbStorageSearchWbStorageDataQueryParamsType,
} from '../../types/wb/WbStorageSearchWbStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const wbStorageSearchWbStorageDataSuspenseQueryKey = (params?: WbStorageSearchWbStorageDataQueryParamsType) =>
  [{ url: '/wb/storage/search' }, ...(params ? [params] : [])] as const

export type WbStorageSearchWbStorageDataSuspenseQueryKey = ReturnType<typeof wbStorageSearchWbStorageDataSuspenseQueryKey>

/**
 * @description Search WB storage data by product name/article and apply quantity/defect filters with sorting
 * @summary Search and filter WB storage data
 * {@link /wb/storage/search}
 */
export async function wbStorageSearchWbStorageDataSuspense(
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

export function wbStorageSearchWbStorageDataSuspenseQueryOptions(
  params?: WbStorageSearchWbStorageDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbStorageSearchWbStorageDataSuspenseQueryKey(params)
  return queryOptions<
    WbStorageSearchWbStorageDataQueryResponseType,
    ResponseErrorConfig<Error>,
    WbStorageSearchWbStorageDataQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbStorageSearchWbStorageDataSuspense(params, config)
    },
  })
}

/**
 * @description Search WB storage data by product name/article and apply quantity/defect filters with sorting
 * @summary Search and filter WB storage data
 * {@link /wb/storage/search}
 */
export function useWbStorageSearchWbStorageDataSuspense<
  TData = WbStorageSearchWbStorageDataQueryResponseType,
  TQueryData = WbStorageSearchWbStorageDataQueryResponseType,
  TQueryKey extends QueryKey = WbStorageSearchWbStorageDataSuspenseQueryKey,
>(
  params?: WbStorageSearchWbStorageDataQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<WbStorageSearchWbStorageDataQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbStorageSearchWbStorageDataSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(wbStorageSearchWbStorageDataSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}