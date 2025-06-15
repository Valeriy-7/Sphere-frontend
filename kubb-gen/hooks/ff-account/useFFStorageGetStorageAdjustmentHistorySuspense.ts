import client from '@/modules/auth/axios-client'
import type {
  FFStorageGetStorageAdjustmentHistoryQueryResponseType,
  FFStorageGetStorageAdjustmentHistoryQueryParamsType,
} from '../../types/ff-account/FFStorageGetStorageAdjustmentHistoryType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFStorageGetStorageAdjustmentHistorySuspenseQueryKey = (params?: FFStorageGetStorageAdjustmentHistoryQueryParamsType) =>
  [{ url: '/ff-account/storage/adjustments' }, ...(params ? [params] : [])] as const

export type FFStorageGetStorageAdjustmentHistorySuspenseQueryKey = ReturnType<typeof FFStorageGetStorageAdjustmentHistorySuspenseQueryKey>

/**
 * @description Retrieve history of storage adjustments for audit purposes
 * @summary Get storage adjustment history
 * {@link /ff-account/storage/adjustments}
 */
export async function FFStorageGetStorageAdjustmentHistorySuspense(
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

export function FFStorageGetStorageAdjustmentHistorySuspenseQueryOptions(
  params?: FFStorageGetStorageAdjustmentHistoryQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFStorageGetStorageAdjustmentHistorySuspenseQueryKey(params)
  return queryOptions<
    FFStorageGetStorageAdjustmentHistoryQueryResponseType,
    ResponseErrorConfig<Error>,
    FFStorageGetStorageAdjustmentHistoryQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageGetStorageAdjustmentHistorySuspense(params, config)
    },
  })
}

/**
 * @description Retrieve history of storage adjustments for audit purposes
 * @summary Get storage adjustment history
 * {@link /ff-account/storage/adjustments}
 */
export function useFFStorageGetStorageAdjustmentHistorySuspense<
  TData = FFStorageGetStorageAdjustmentHistoryQueryResponseType,
  TQueryData = FFStorageGetStorageAdjustmentHistoryQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetStorageAdjustmentHistorySuspenseQueryKey,
>(
  params?: FFStorageGetStorageAdjustmentHistoryQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<FFStorageGetStorageAdjustmentHistoryQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetStorageAdjustmentHistorySuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(FFStorageGetStorageAdjustmentHistorySuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}