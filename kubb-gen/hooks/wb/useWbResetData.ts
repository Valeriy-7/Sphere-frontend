import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  WbResetDataQueryResponseType,
  WbResetDataQueryParamsType,
} from '../../types/wb/WbResetDataType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const wbResetDataQueryKey = (params: WbResetDataQueryParamsType) =>
  [{ url: '/wb/reset-data' }, ...(params ? [params] : [])] as const;

export type WbResetDataQueryKey = ReturnType<typeof wbResetDataQueryKey>;

/**
 * @description     Удаляет все существующие данные о товарах и выполняет принудительную синхронизацию с API Wildberries.    ### Процесс:    1. Удаление всех существующих товаров для кабинета    2. Удаление информации о складах    3. Получение новых данных через API Wildberries    ### Важно:    - Процесс может занять некоторое время    - Все существующие данные будут удалены    - Для отладки включено подробное логирование
 * @summary Сброс данных и принудительная синхронизация
 * {@link /wb/reset-data}
 */
export async function wbResetData(
  params: WbResetDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<WbResetDataQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/reset-data`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function wbResetDataQueryOptions(
  params: WbResetDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbResetDataQueryKey(params);
  return queryOptions<
    WbResetDataQueryResponseType,
    ResponseErrorConfig<Error>,
    WbResetDataQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return wbResetData(params, config);
    },
  });
}

/**
 * @description     Удаляет все существующие данные о товарах и выполняет принудительную синхронизацию с API Wildberries.    ### Процесс:    1. Удаление всех существующих товаров для кабинета    2. Удаление информации о складах    3. Получение новых данных через API Wildberries    ### Важно:    - Процесс может занять некоторое время    - Все существующие данные будут удалены    - Для отладки включено подробное логирование
 * @summary Сброс данных и принудительная синхронизация
 * {@link /wb/reset-data}
 */
export function useWbResetData<
  TData = WbResetDataQueryResponseType,
  TQueryData = WbResetDataQueryResponseType,
  TQueryKey extends QueryKey = WbResetDataQueryKey,
>(
  params: WbResetDataQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        WbResetDataQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? wbResetDataQueryKey(params);

  const query = useQuery({
    ...(wbResetDataQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
