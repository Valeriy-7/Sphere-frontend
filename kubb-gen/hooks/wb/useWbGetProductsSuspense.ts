import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  WbGetProductsQueryResponseType,
  WbGetProductsQueryParamsType,
} from '../../types/wb/WbGetProductsType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const wbGetProductsSuspenseQueryKey = (params: WbGetProductsQueryParamsType) =>
  [{ url: '/wb/products' }, ...(params ? [params] : [])] as const;

export type WbGetProductsSuspenseQueryKey = ReturnType<typeof wbGetProductsSuspenseQueryKey>;

/**
 * @description     Возвращает список всех продуктов кабинета с возможностью поиска по названию.    Автоматически синхронизирует данные с Wildberries перед возвратом результатов.    ### Возвращаемые данные:    - Общая статистика по всем товарам    - Детальная информация по каждому товару    - Распределение по складам    - Статистика продаж и заказов
 * @summary Получить список всех продуктов
 * {@link /wb/products}
 */
export async function wbGetProductsSuspense(
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

export function wbGetProductsSuspenseQueryOptions(
  params: WbGetProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbGetProductsSuspenseQueryKey(params);
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
      return wbGetProductsSuspense(params, config);
    },
  });
}

/**
 * @description     Возвращает список всех продуктов кабинета с возможностью поиска по названию.    Автоматически синхронизирует данные с Wildberries перед возвратом результатов.    ### Возвращаемые данные:    - Общая статистика по всем товарам    - Детальная информация по каждому товару    - Распределение по складам    - Статистика продаж и заказов
 * @summary Получить список всех продуктов
 * {@link /wb/products}
 */
export function useWbGetProductsSuspense<
  TData = WbGetProductsQueryResponseType,
  TQueryData = WbGetProductsQueryResponseType,
  TQueryKey extends QueryKey = WbGetProductsSuspenseQueryKey,
>(
  params: WbGetProductsQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        WbGetProductsQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? wbGetProductsSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(wbGetProductsSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
