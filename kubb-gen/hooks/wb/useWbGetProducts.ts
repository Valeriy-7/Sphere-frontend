import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  WbGetProductsQueryResponseType,
  WbGetProductsQueryParamsType,
} from '../../types/wb/WbGetProductsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const wbGetProductsQueryKey = (params: WbGetProductsQueryParamsType) =>
  [{ url: '/wb/products' }, ...(params ? [params] : [])] as const;

export type WbGetProductsQueryKey = ReturnType<typeof wbGetProductsQueryKey>;

/**
 * @description     Возвращает список всех продуктов кабинета с возможностью поиска по названию.    Автоматически синхронизирует данные с Wildberries перед возвратом результатов.    ### Возвращаемые данные:    - Общая статистика по всем товарам    - Детальная информация по каждому товару    - Распределение по складам    - Статистика продаж и заказов
 * @summary Получить список всех продуктов
 * {@link /wb/products}
 */
export async function wbGetProducts(
  params: WbGetProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<WbGetProductsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/products`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function wbGetProductsQueryOptions(
  params: WbGetProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbGetProductsQueryKey(params);
  return queryOptions<
    WbGetProductsQueryResponseType,
    ResponseErrorConfig<Error>,
    WbGetProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return wbGetProducts(params, config);
    },
  });
}

/**
 * @description     Возвращает список всех продуктов кабинета с возможностью поиска по названию.    Автоматически синхронизирует данные с Wildberries перед возвратом результатов.    ### Возвращаемые данные:    - Общая статистика по всем товарам    - Детальная информация по каждому товару    - Распределение по складам    - Статистика продаж и заказов
 * @summary Получить список всех продуктов
 * {@link /wb/products}
 */
export function useWbGetProducts<
  TData = WbGetProductsQueryResponseType,
  TQueryData = WbGetProductsQueryResponseType,
  TQueryKey extends QueryKey = WbGetProductsQueryKey,
>(
  params: WbGetProductsQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        WbGetProductsQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? wbGetProductsQueryKey(params);

  const query = useQuery({
    ...(wbGetProductsQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
