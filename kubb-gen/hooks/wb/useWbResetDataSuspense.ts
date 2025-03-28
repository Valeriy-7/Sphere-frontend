import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  WbResetDataQueryResponseType,
  WbResetDataQueryParamsType,
} from '../../types/wb/WbResetDataType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const wbResetDataSuspenseQueryKey = (params: WbResetDataQueryParamsType) =>
  [{ url: '/wb/reset-data' }, ...(params ? [params] : [])] as const;

export type WbResetDataSuspenseQueryKey = ReturnType<typeof wbResetDataSuspenseQueryKey>;

/**
 * @description     Удаляет все существующие данные о товарах и выполняет принудительную синхронизацию с API Wildberries.    ### Процесс:    1. Удаление всех существующих товаров для кабинета    2. Удаление информации о складах    3. Получение новых данных через API Wildberries    ### Важно:    - Процесс может занять некоторое время    - Все существующие данные будут удалены    - Для отладки включено подробное логирование
 * @summary Сброс данных и принудительная синхронизация
 * {@link /wb/reset-data}
 */
export async function wbResetDataSuspense(
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

export function wbResetDataSuspenseQueryOptions(
  params: WbResetDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbResetDataSuspenseQueryKey(params);
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
      return wbResetDataSuspense(params, config);
    },
  });
}

/**
 * @description     Удаляет все существующие данные о товарах и выполняет принудительную синхронизацию с API Wildberries.    ### Процесс:    1. Удаление всех существующих товаров для кабинета    2. Удаление информации о складах    3. Получение новых данных через API Wildberries    ### Важно:    - Процесс может занять некоторое время    - Все существующие данные будут удалены    - Для отладки включено подробное логирование
 * @summary Сброс данных и принудительная синхронизация
 * {@link /wb/reset-data}
 */
export function useWbResetDataSuspense<
  TData = WbResetDataQueryResponseType,
  TQueryData = WbResetDataQueryResponseType,
  TQueryKey extends QueryKey = WbResetDataSuspenseQueryKey,
>(
  params: WbResetDataQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        WbResetDataQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? wbResetDataSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(wbResetDataSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
