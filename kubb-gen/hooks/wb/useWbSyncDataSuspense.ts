import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  WbSyncDataQueryResponseType,
  WbSyncDataQueryParamsType,
} from '../../types/wb/WbSyncDataType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const wbSyncDataSuspenseQueryKey = (params: WbSyncDataQueryParamsType) =>
  [{ url: '/wb/sync-data' }, ...(params ? [params] : [])] as const;

export type WbSyncDataSuspenseQueryKey = ReturnType<typeof wbSyncDataSuspenseQueryKey>;

/**
 * @description     Выполняет принудительную синхронизацию данных с Wildberries для указанного кабинета.    ### Процесс:    1. Получение данных о товарах    2. Получение остатков на складах    3. Получение информации о заказах    4. Получение информации о поставках    5. Получение информации о продажах    ### Важно:    - Процесс может занять некоторое время    - Для отладки включено подробное логирование
 * @summary Принудительная синхронизация данных
 * {@link /wb/sync-data}
 */
export async function wbSyncDataSuspense(
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

export function wbSyncDataSuspenseQueryOptions(
  params: WbSyncDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbSyncDataSuspenseQueryKey(params);
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
      return wbSyncDataSuspense(params, config);
    },
  });
}

/**
 * @description     Выполняет принудительную синхронизацию данных с Wildberries для указанного кабинета.    ### Процесс:    1. Получение данных о товарах    2. Получение остатков на складах    3. Получение информации о заказах    4. Получение информации о поставках    5. Получение информации о продажах    ### Важно:    - Процесс может занять некоторое время    - Для отладки включено подробное логирование
 * @summary Принудительная синхронизация данных
 * {@link /wb/sync-data}
 */
export function useWbSyncDataSuspense<
  TData = WbSyncDataQueryResponseType,
  TQueryData = WbSyncDataQueryResponseType,
  TQueryKey extends QueryKey = WbSyncDataSuspenseQueryKey,
>(
  params: WbSyncDataQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        WbSyncDataQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? wbSyncDataSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(wbSyncDataSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
