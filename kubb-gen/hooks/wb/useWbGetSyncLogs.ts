import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  WbGetSyncLogsQueryResponseType,
  WbGetSyncLogsQueryParamsType,
} from '../../types/wb/WbGetSyncLogsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const wbGetSyncLogsQueryKey = (params: WbGetSyncLogsQueryParamsType) =>
  [{ url: '/wb/sync-logs' }, ...(params ? [params] : [])] as const;

export type WbGetSyncLogsQueryKey = ReturnType<typeof wbGetSyncLogsQueryKey>;

/**
 * @description     Возвращает логи последней синхронизации данных с Wildberries для указанного кабинета.    ### Важно:    - Логи содержат подробную информацию о процессе синхронизации    - Логи помогают в диагностике проблем с синхронизацией
 * @summary Получение логов синхронизации
 * {@link /wb/sync-logs}
 */
export async function wbGetSyncLogs(
  params: WbGetSyncLogsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<WbGetSyncLogsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/sync-logs`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function wbGetSyncLogsQueryOptions(
  params: WbGetSyncLogsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbGetSyncLogsQueryKey(params);
  return queryOptions<
    WbGetSyncLogsQueryResponseType,
    ResponseErrorConfig<Error>,
    WbGetSyncLogsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return wbGetSyncLogs(params, config);
    },
  });
}

/**
 * @description     Возвращает логи последней синхронизации данных с Wildberries для указанного кабинета.    ### Важно:    - Логи содержат подробную информацию о процессе синхронизации    - Логи помогают в диагностике проблем с синхронизацией
 * @summary Получение логов синхронизации
 * {@link /wb/sync-logs}
 */
export function useWbGetSyncLogs<
  TData = WbGetSyncLogsQueryResponseType,
  TQueryData = WbGetSyncLogsQueryResponseType,
  TQueryKey extends QueryKey = WbGetSyncLogsQueryKey,
>(
  params: WbGetSyncLogsQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        WbGetSyncLogsQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? wbGetSyncLogsQueryKey(params);

  const query = useQuery({
    ...(wbGetSyncLogsQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
