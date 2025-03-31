import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { WbGetSyncLogsQueryResponseType, WbGetSyncLogsQueryParamsType } from '../../types/wb/WbGetSyncLogsType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const wbGetSyncLogsSuspenseQueryKey = (params: WbGetSyncLogsQueryParamsType) => [{ url: '/wb/sync-logs' }, ...(params ? [params] : [])] as const

export type WbGetSyncLogsSuspenseQueryKey = ReturnType<typeof wbGetSyncLogsSuspenseQueryKey>

/**
 * @description     Возвращает логи последней синхронизации данных с Wildberries для указанного кабинета.    ### Важно:    - Логи содержат подробную информацию о процессе синхронизации    - Логи помогают в диагностике проблем с синхронизацией
 * @summary Получение логов синхронизации
 * {@link /wb/sync-logs}
 */
export async function wbGetSyncLogsSuspense(params: WbGetSyncLogsQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbGetSyncLogsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/sync-logs`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function wbGetSyncLogsSuspenseQueryOptions(params: WbGetSyncLogsQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = wbGetSyncLogsSuspenseQueryKey(params)
  return queryOptions<WbGetSyncLogsQueryResponseType, ResponseErrorConfig<Error>, WbGetSyncLogsQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbGetSyncLogsSuspense(params, config)
    },
  })
}

/**
 * @description     Возвращает логи последней синхронизации данных с Wildberries для указанного кабинета.    ### Важно:    - Логи содержат подробную информацию о процессе синхронизации    - Логи помогают в диагностике проблем с синхронизацией
 * @summary Получение логов синхронизации
 * {@link /wb/sync-logs}
 */
export function useWbGetSyncLogsSuspense<
  TData = WbGetSyncLogsQueryResponseType,
  TQueryData = WbGetSyncLogsQueryResponseType,
  TQueryKey extends QueryKey = WbGetSyncLogsSuspenseQueryKey,
>(
  params: WbGetSyncLogsQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<WbGetSyncLogsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbGetSyncLogsSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(wbGetSyncLogsSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}