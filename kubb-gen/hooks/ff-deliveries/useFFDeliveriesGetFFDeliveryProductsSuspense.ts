import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  FFDeliveriesGetFFDeliveryProductsQueryResponseType,
  FFDeliveriesGetFFDeliveryProductsPathParamsType,
  FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  FFDeliveriesGetFFDeliveryProducts400Type,
  FFDeliveriesGetFFDeliveryProducts401Type,
  FFDeliveriesGetFFDeliveryProducts404Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFDeliveryProductsType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const FFDeliveriesGetFFDeliveryProductsSuspenseQueryKey = (
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
) =>
  [
    { url: '/ff-deliveries/:id/products', params: { id: id } },
    ...(params ? [params] : []),
  ] as const;

export type FFDeliveriesGetFFDeliveryProductsSuspenseQueryKey = ReturnType<
  typeof FFDeliveriesGetFFDeliveryProductsSuspenseQueryKey
>;

/**
 * @description Возвращает список товаров для конкретной поставки на ФФ с возможностью фильтрации по поставщику. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров в поставке на ФФ
 * {@link /ff-deliveries/:id/products}
 */
export async function FFDeliveriesGetFFDeliveryProductsSuspense(
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFDeliveriesGetFFDeliveryProductsQueryResponseType,
    ResponseErrorConfig<
      | FFDeliveriesGetFFDeliveryProducts400Type
      | FFDeliveriesGetFFDeliveryProducts401Type
      | FFDeliveriesGetFFDeliveryProducts404Type
    >,
    unknown
  >({ method: 'GET', url: `/ff-deliveries/${id}/products`, params, ...requestConfig });
  return res.data;
}

export function FFDeliveriesGetFFDeliveryProductsSuspenseQueryOptions(
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFDeliveryProductsSuspenseQueryKey(id, params);
  return queryOptions<
    FFDeliveriesGetFFDeliveryProductsQueryResponseType,
    ResponseErrorConfig<
      | FFDeliveriesGetFFDeliveryProducts400Type
      | FFDeliveriesGetFFDeliveryProducts401Type
      | FFDeliveriesGetFFDeliveryProducts404Type
    >,
    FFDeliveriesGetFFDeliveryProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return FFDeliveriesGetFFDeliveryProductsSuspense(id, params, config);
    },
  });
}

/**
 * @description Возвращает список товаров для конкретной поставки на ФФ с возможностью фильтрации по поставщику. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров в поставке на ФФ
 * {@link /ff-deliveries/:id/products}
 */
export function useFFDeliveriesGetFFDeliveryProductsSuspense<
  TData = FFDeliveriesGetFFDeliveryProductsQueryResponseType,
  TQueryData = FFDeliveriesGetFFDeliveryProductsQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFDeliveryProductsSuspenseQueryKey,
>(
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFDeliveriesGetFFDeliveryProductsQueryResponseType,
        ResponseErrorConfig<
          | FFDeliveriesGetFFDeliveryProducts400Type
          | FFDeliveriesGetFFDeliveryProducts401Type
          | FFDeliveriesGetFFDeliveryProducts404Type
        >,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? FFDeliveriesGetFFDeliveryProductsSuspenseQueryKey(id, params);

  const query = useSuspenseQuery({
    ...(FFDeliveriesGetFFDeliveryProductsSuspenseQueryOptions(
      id,
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<
      | FFDeliveriesGetFFDeliveryProducts400Type
      | FFDeliveriesGetFFDeliveryProducts401Type
      | FFDeliveriesGetFFDeliveryProducts404Type
    >
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
