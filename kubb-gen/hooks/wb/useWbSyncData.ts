import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  WbSyncDataQueryResponseType,
  WbSyncDataQueryParamsType,
} from '../../types/wb/WbSyncDataType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const wbSyncDataQueryKey = (params: WbSyncDataQueryParamsType) =>
  [{ url: '/wb/sync-data' }, ...(params ? [params] : [])] as const;

export type WbSyncDataQueryKey = ReturnType<typeof wbSyncDataQueryKey>;

/**
 * @description     Выполняет принудительную синхронизацию данных с Wildberries для указанного кабинета.    ### Процесс:    1. Получение данных о товарах    2. Получение остатков на складах    3. Получение информации о заказах    4. Получение информации о поставках    5. Получение информации о продажах    ### Важно:    - Процесс может занять некоторое время    - Для отладки включено подробное логирование
 * @summary Принудительная синхронизация данных
 * {@link /wb/sync-data}
 */
export async function wbSyncData(
  params: WbSyncDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<WbSyncDataQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/sync-data`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function wbSyncDataQueryOptions(
  params: WbSyncDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbSyncDataQueryKey(params);
  return queryOptions<
    WbSyncDataQueryResponseType,
    ResponseErrorConfig<Error>,
    WbSyncDataQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return wbSyncData(params, config);
    },
  });
}

/**
 * @description     Выполняет принудительную синхронизацию данных с Wildberries для указанного кабинета.    ### Процесс:    1. Получение данных о товарах    2. Получение остатков на складах    3. Получение информации о заказах    4. Получение информации о поставках    5. Получение информации о продажах    ### Важно:    - Процесс может занять некоторое время    - Для отладки включено подробное логирование
 * @summary Принудительная синхронизация данных
 * {@link /wb/sync-data}
 */
export function useWbSyncData<
  TData = WbSyncDataQueryResponseType,
  TQueryData = WbSyncDataQueryResponseType,
  TQueryKey extends QueryKey = WbSyncDataQueryKey,
>(
  params: WbSyncDataQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        WbSyncDataQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? wbSyncDataQueryKey(params);

  const query = useQuery({
    ...(wbSyncDataQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
