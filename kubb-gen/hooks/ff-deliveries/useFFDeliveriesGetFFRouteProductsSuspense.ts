import client from '@/modules/auth/axios-client'
import type {
  FFDeliveriesGetFFRouteProductsQueryResponseType,
  FFDeliveriesGetFFRouteProductsPathParamsType,
  FFDeliveriesGetFFRouteProducts400Type,
  FFDeliveriesGetFFRouteProducts401Type,
  FFDeliveriesGetFFRouteProducts404Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFRouteProductsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFDeliveriesGetFFRouteProductsSuspenseQueryKey = (id: FFDeliveriesGetFFRouteProductsPathParamsType['id']) =>
  [{ url: '/ff-deliveries/route/:id/products', params: { id: id } }] as const

export type FFDeliveriesGetFFRouteProductsSuspenseQueryKey = ReturnType<typeof FFDeliveriesGetFFRouteProductsSuspenseQueryKey>

/**
 * @description Возвращает список товаров для конкретного маршрута поставки. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту
 * {@link /ff-deliveries/route/:id/products}
 */
export async function FFDeliveriesGetFFRouteProductsSuspense(
  id: FFDeliveriesGetFFRouteProductsPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFDeliveriesGetFFRouteProductsQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFRouteProducts400Type | FFDeliveriesGetFFRouteProducts401Type | FFDeliveriesGetFFRouteProducts404Type>,
    unknown
  >({ method: 'GET', url: `/ff-deliveries/route/${id}/products`, ...requestConfig })
  return res.data
}

export function FFDeliveriesGetFFRouteProductsSuspenseQueryOptions(
  id: FFDeliveriesGetFFRouteProductsPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFRouteProductsSuspenseQueryKey(id)
  return queryOptions<
    FFDeliveriesGetFFRouteProductsQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFRouteProducts400Type | FFDeliveriesGetFFRouteProducts401Type | FFDeliveriesGetFFRouteProducts404Type>,
    FFDeliveriesGetFFRouteProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFDeliveriesGetFFRouteProductsSuspense(id, config)
    },
  })
}

/**
 * @description Возвращает список товаров для конкретного маршрута поставки. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту
 * {@link /ff-deliveries/route/:id/products}
 */
export function useFFDeliveriesGetFFRouteProductsSuspense<
  TData = FFDeliveriesGetFFRouteProductsQueryResponseType,
  TQueryData = FFDeliveriesGetFFRouteProductsQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFRouteProductsSuspenseQueryKey,
>(
  id: FFDeliveriesGetFFRouteProductsPathParamsType['id'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFDeliveriesGetFFRouteProductsQueryResponseType,
        ResponseErrorConfig<FFDeliveriesGetFFRouteProducts400Type | FFDeliveriesGetFFRouteProducts401Type | FFDeliveriesGetFFRouteProducts404Type>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFDeliveriesGetFFRouteProductsSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(FFDeliveriesGetFFRouteProductsSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<FFDeliveriesGetFFRouteProducts400Type | FFDeliveriesGetFFRouteProducts401Type | FFDeliveriesGetFFRouteProducts404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}