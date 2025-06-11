import client from '@/modules/auth/axios-client'
import type {
  FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
  FFDeliveriesGetFFRouteSupplierProductsPathParamsType,
  FFDeliveriesGetFFRouteSupplierProducts401Type,
  FFDeliveriesGetFFRouteSupplierProducts404Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFRouteSupplierProductsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryKey = (
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
) => [{ url: '/ff-deliveries/route/:routeId/supplier/:supplierId/products', params: { routeId: routeId, supplierId: supplierId } }] as const

export type FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryKey = ReturnType<typeof FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryKey>

/**
 * @description Возвращает список товаров для конкретного маршрута и поставщика. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту и поставщику
 * {@link /ff-deliveries/route/:routeId/supplier/:supplierId/products}
 */
export async function FFDeliveriesGetFFRouteSupplierProductsSuspense(
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type>,
    unknown
  >({ method: 'GET', url: `/ff-deliveries/route/${routeId}/supplier/${supplierId}/products`, ...requestConfig })
  return res.data
}

export function FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryOptions(
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryKey(routeId, supplierId)
  return queryOptions<
    FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type>,
    FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!(routeId && supplierId),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFDeliveriesGetFFRouteSupplierProductsSuspense(routeId, supplierId, config)
    },
  })
}

/**
 * @description Возвращает список товаров для конкретного маршрута и поставщика. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту и поставщику
 * {@link /ff-deliveries/route/:routeId/supplier/:supplierId/products}
 */
export function useFFDeliveriesGetFFRouteSupplierProductsSuspense<
  TData = FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
  TQueryData = FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryKey,
>(
  routeId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['routeId'],
  supplierId: FFDeliveriesGetFFRouteSupplierProductsPathParamsType['supplierId'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFDeliveriesGetFFRouteSupplierProductsQueryResponseType,
        ResponseErrorConfig<FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryKey(routeId, supplierId)

  const query = useSuspenseQuery({
    ...(FFDeliveriesGetFFRouteSupplierProductsSuspenseQueryOptions(routeId, supplierId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FFDeliveriesGetFFRouteSupplierProducts401Type | FFDeliveriesGetFFRouteSupplierProducts404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}