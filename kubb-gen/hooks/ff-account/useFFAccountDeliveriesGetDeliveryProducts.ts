import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
  FFAccountDeliveriesGetDeliveryProductsPathParamsType,
  FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  FFAccountDeliveriesGetDeliveryProducts404Type,
} from '../../types/ff-account/FFAccountDeliveriesGetDeliveryProductsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const FFAccountDeliveriesGetDeliveryProductsQueryKey = (
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
) =>
  [
    { url: '/ff-account/deliveries/:id/products', params: { id: id } },
    ...(params ? [params] : []),
  ] as const;

export type FFAccountDeliveriesGetDeliveryProductsQueryKey = ReturnType<
  typeof FFAccountDeliveriesGetDeliveryProductsQueryKey
>;

/**
 * @description Возвращает список товаров для конкретной поставки с возможностью фильтрации по поставщику.
 * @summary Получить товары поставки
 * {@link /ff-account/deliveries/:id/products}
 */
export async function FFAccountDeliveriesGetDeliveryProducts(
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
    ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>,
    unknown
  >({ method: 'GET', url: `/ff-account/deliveries/${id}/products`, params, ...requestConfig });
  return res.data;
}

export function FFAccountDeliveriesGetDeliveryProductsQueryOptions(
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFAccountDeliveriesGetDeliveryProductsQueryKey(id, params);
  return queryOptions<
    FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
    ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>,
    FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return FFAccountDeliveriesGetDeliveryProducts(id, params, config);
    },
  });
}

/**
 * @description Возвращает список товаров для конкретной поставки с возможностью фильтрации по поставщику.
 * @summary Получить товары поставки
 * {@link /ff-account/deliveries/:id/products}
 */
export function useFFAccountDeliveriesGetDeliveryProducts<
  TData = FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
  TQueryData = FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetDeliveryProductsQueryKey,
>(
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
        ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? FFAccountDeliveriesGetDeliveryProductsQueryKey(id, params);

  const query = useQuery({
    ...(FFAccountDeliveriesGetDeliveryProductsQueryOptions(
      id,
      params,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
