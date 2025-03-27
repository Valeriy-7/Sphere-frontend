import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
  FFDeliveriesGetFFRouteSupplierProductsPathParamsType,
  FFDeliveriesGetFFRouteSupplierProducts401Type,
  FFDeliveriesGetFFRouteSupplierProducts404Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFRouteSupplierProductsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const FFDeliveriesGetFFRouteSupplierProductsQueryKey = (
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
) =>
  [
    {
      url: '/ff-deliveries/route/:routeId/supplier/:supplierId/products',
      params: { routeId: routeId, supplierId: supplierId },
    },
  ] as const;

export type FFDeliveriesGetFFRouteSupplierProductsQueryKey = ReturnType<
  typeof FFDeliveriesGetFFRouteSupplierProductsQueryKey
>;

/**
 * @description Возвращает список товаров для конкретного маршрута и поставщика. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту и поставщику
 * {@link /ff-deliveries/route/:routeId/supplier/:supplierId/products}
 */
export async function FFDeliveriesGetFFRouteSupplierProducts(
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
    ResponseErrorConfig<
      FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type
    >,
    unknown
  >({
    method: 'GET',
    url: `/ff-deliveries/route/${routeId}/supplier/${supplierId}/products`,
    ...requestConfig,
  });
  return res.data;
}

export function FFDeliveriesGetFFRouteSupplierProductsQueryOptions(
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFRouteSupplierProductsQueryKey(routeId, supplierId);
  return queryOptions<
    FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
    ResponseErrorConfig<
      FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type
    >,
    FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!(routeId && supplierId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return FFDeliveriesGetFFRouteSupplierProducts(routeId, supplierId, config);
    },
  });
}

/**
 * @description Возвращает список товаров для конкретного маршрута и поставщика. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту и поставщику
 * {@link /ff-deliveries/route/:routeId/supplier/:supplierId/products}
 */
export function useFFDeliveriesGetFFRouteSupplierProducts<
  TData = FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
  TQueryData = FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFRouteSupplierProductsQueryKey,
>(
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
        ResponseErrorConfig<
          | FFDeliveriesGetFFRouteSupplierProducts401Type
          | FFDeliveriesGetFFRouteSupplierProducts404Type
        >,
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
    queryOptions?.queryKey ?? FFDeliveriesGetFFRouteSupplierProductsQueryKey(routeId, supplierId);

  const query = useQuery({
    ...(FFDeliveriesGetFFRouteSupplierProductsQueryOptions(
      routeId,
      supplierId,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<
      FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type
    >
  > & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
