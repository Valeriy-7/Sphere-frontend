import client from '@/modules/auth/axios-client'
import type {
  FFStorageGetStorageAdjustmentHistoryQueryResponseType,
  FFStorageGetStorageAdjustmentHistoryQueryParamsType,
} from '../../types/ff-account/FFStorageGetStorageAdjustmentHistoryType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFStorageGetStorageAdjustmentHistoryQueryKey = (params?: FFStorageGetStorageAdjustmentHistoryQueryParamsType) =>
  [{ url: '/ff-account/storage/adjustments' }, ...(params ? [params] : [])] as const

export type FFStorageGetStorageAdjustmentHistoryQueryKey = ReturnType<typeof FFStorageGetStorageAdjustmentHistoryQueryKey>

/**
 * @description Retrieve history of storage adjustments for audit purposes
 * @summary Get storage adjustment history
 * {@link /ff-account/storage/adjustments}
 */
export async function FFStorageGetStorageAdjustmentHistory(
  params?: FFStorageGetStorageAdjustmentHistoryQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFStorageGetStorageAdjustmentHistoryQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/storage/adjustments`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function FFStorageGetStorageAdjustmentHistoryQueryOptions(
  params?: FFStorageGetStorageAdjustmentHistoryQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFStorageGetStorageAdjustmentHistoryQueryKey(params)
  return queryOptions<
    FFStorageGetStorageAdjustmentHistoryQueryResponseType,
    ResponseErrorConfig<Error>,
    FFStorageGetStorageAdjustmentHistoryQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageGetStorageAdjustmentHistory(params, config)
    },
  })
}

/**
 * @description Retrieve history of storage adjustments for audit purposes
 * @summary Get storage adjustment history
 * {@link /ff-account/storage/adjustments}
 */
export function useFFStorageGetStorageAdjustmentHistory<
  TData = FFStorageGetStorageAdjustmentHistoryQueryResponseType,
  TQueryData = FFStorageGetStorageAdjustmentHistoryQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetStorageAdjustmentHistoryQueryKey,
>(
  params?: FFStorageGetStorageAdjustmentHistoryQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<FFStorageGetStorageAdjustmentHistoryQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetStorageAdjustmentHistoryQueryKey(params)

  const query = useQuery({
    ...(FFStorageGetStorageAdjustmentHistoryQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}