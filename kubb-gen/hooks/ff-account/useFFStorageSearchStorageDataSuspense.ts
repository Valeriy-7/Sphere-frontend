import client from '@/modules/auth/axios-client'
import type {
  FFStorageSearchStorageDataQueryResponseType,
  FFStorageSearchStorageDataQueryParamsType,
} from '../../types/ff-account/FFStorageSearchStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFStorageSearchStorageDataSuspenseQueryKey = (params?: FFStorageSearchStorageDataQueryParamsType) =>
  [{ url: '/ff-account/storage/search' }, ...(params ? [params] : [])] as const

export type FFStorageSearchStorageDataSuspenseQueryKey = ReturnType<typeof FFStorageSearchStorageDataSuspenseQueryKey>

/**
 * @description Search storage data by supplier name/ID and apply quantity/defect filters with sorting
 * @summary Search and filter storage data
 * {@link /ff-account/storage/search}
 */
export async function FFStorageSearchStorageDataSuspense(
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

export function FFStorageSearchStorageDataSuspenseQueryOptions(
  params?: FFStorageSearchStorageDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFStorageSearchStorageDataSuspenseQueryKey(params)
  return queryOptions<FFStorageSearchStorageDataQueryResponseType, ResponseErrorConfig<Error>, FFStorageSearchStorageDataQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageSearchStorageDataSuspense(params, config)
    },
  })
}

/**
 * @description Search storage data by supplier name/ID and apply quantity/defect filters with sorting
 * @summary Search and filter storage data
 * {@link /ff-account/storage/search}
 */
export function useFFStorageSearchStorageDataSuspense<
  TData = FFStorageSearchStorageDataQueryResponseType,
  TQueryData = FFStorageSearchStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageSearchStorageDataSuspenseQueryKey,
>(
  params?: FFStorageSearchStorageDataQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<FFStorageSearchStorageDataQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageSearchStorageDataSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(FFStorageSearchStorageDataSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}