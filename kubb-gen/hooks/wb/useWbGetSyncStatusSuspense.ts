import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { WbGetSyncStatusQueryResponseType, WbGetSyncStatusQueryParamsType } from '../../types/wb/WbGetSyncStatusType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const wbGetSyncStatusSuspenseQueryKey = (params: WbGetSyncStatusQueryParamsType) => [{ url: '/wb/sync-status' }, ...(params ? [params] : [])] as const

export type WbGetSyncStatusSuspenseQueryKey = ReturnType<typeof wbGetSyncStatusSuspenseQueryKey>

/**
 * @description Возвращает информацию о том, идет ли сейчас синхронизация данных для указанного кабинета
 * @summary Получить статус синхронизации данных
 * {@link /wb/sync-status}
 */
export async function wbGetSyncStatusSuspense(params: WbGetSyncStatusQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbGetSyncStatusQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/sync-status`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function wbGetSyncStatusSuspenseQueryOptions(params: WbGetSyncStatusQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = wbGetSyncStatusSuspenseQueryKey(params)
  return queryOptions<WbGetSyncStatusQueryResponseType, ResponseErrorConfig<Error>, WbGetSyncStatusQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbGetSyncStatusSuspense(params, config)
    },
  })
}

/**
 * @description Возвращает информацию о том, идет ли сейчас синхронизация данных для указанного кабинета
 * @summary Получить статус синхронизации данных
 * {@link /wb/sync-status}
 */
export function useWbGetSyncStatusSuspense<
  TData = WbGetSyncStatusQueryResponseType,
  TQueryData = WbGetSyncStatusQueryResponseType,
  TQueryKey extends QueryKey = WbGetSyncStatusSuspenseQueryKey,
>(
  params: WbGetSyncStatusQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<WbGetSyncStatusQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbGetSyncStatusSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(wbGetSyncStatusSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}