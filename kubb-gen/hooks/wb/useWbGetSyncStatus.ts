import client from '@/modules/auth/axios-client'
import type { WbGetSyncStatusQueryResponseType, WbGetSyncStatusQueryParamsType } from '../../types/wb/WbGetSyncStatusType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const wbGetSyncStatusQueryKey = (params: WbGetSyncStatusQueryParamsType) => [{ url: '/wb/sync-status' }, ...(params ? [params] : [])] as const

export type WbGetSyncStatusQueryKey = ReturnType<typeof wbGetSyncStatusQueryKey>

/**
 * @description Возвращает информацию о том, идет ли сейчас синхронизация данных для указанного кабинета
 * @summary Получить статус синхронизации данных
 * {@link /wb/sync-status}
 */
export async function wbGetSyncStatus(params: WbGetSyncStatusQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbGetSyncStatusQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/sync-status`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function wbGetSyncStatusQueryOptions(params: WbGetSyncStatusQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = wbGetSyncStatusQueryKey(params)
  return queryOptions<WbGetSyncStatusQueryResponseType, ResponseErrorConfig<Error>, WbGetSyncStatusQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbGetSyncStatus(params, config)
    },
  })
}

/**
 * @description Возвращает информацию о том, идет ли сейчас синхронизация данных для указанного кабинета
 * @summary Получить статус синхронизации данных
 * {@link /wb/sync-status}
 */
export function useWbGetSyncStatus<
  TData = WbGetSyncStatusQueryResponseType,
  TQueryData = WbGetSyncStatusQueryResponseType,
  TQueryKey extends QueryKey = WbGetSyncStatusQueryKey,
>(
  params: WbGetSyncStatusQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<WbGetSyncStatusQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbGetSyncStatusQueryKey(params)

  const query = useQuery({
    ...(wbGetSyncStatusQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}