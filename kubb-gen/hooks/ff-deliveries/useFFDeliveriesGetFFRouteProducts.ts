import client from '@/modules/auth/axios-client'
import type {
  FFDeliveriesGetFFRouteProductsQueryResponseType,
  FFDeliveriesGetFFRouteProductsPathParamsType,
  FFDeliveriesGetFFRouteProducts400Type,
  FFDeliveriesGetFFRouteProducts401Type,
  FFDeliveriesGetFFRouteProducts404Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFRouteProductsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFDeliveriesGetFFRouteProductsQueryKey = (id: FFDeliveriesGetFFRouteProductsPathParamsType['id']) =>
  [{ url: '/ff-deliveries/route/:id/products', params: { id: id } }] as const

export type FFDeliveriesGetFFRouteProductsQueryKey = ReturnType<typeof FFDeliveriesGetFFRouteProductsQueryKey>

/**
 * @description Возвращает список товаров для конкретного маршрута поставки. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту
 * {@link /ff-deliveries/route/:id/products}
 */
export async function FFDeliveriesGetFFRouteProducts(
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

export function FFDeliveriesGetFFRouteProductsQueryOptions(
  id: FFDeliveriesGetFFRouteProductsPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFRouteProductsQueryKey(id)
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
      return FFDeliveriesGetFFRouteProducts(id, config)
    },
  })
}

/**
 * @description Возвращает список товаров для конкретного маршрута поставки. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров по маршруту
 * {@link /ff-deliveries/route/:id/products}
 */
export function useFFDeliveriesGetFFRouteProducts<
  TData = FFDeliveriesGetFFRouteProductsQueryResponseType,
  TQueryData = FFDeliveriesGetFFRouteProductsQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFRouteProductsQueryKey,
>(
  id: FFDeliveriesGetFFRouteProductsPathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        FFDeliveriesGetFFRouteProductsQueryResponseType,
        ResponseErrorConfig<FFDeliveriesGetFFRouteProducts400Type | FFDeliveriesGetFFRouteProducts401Type | FFDeliveriesGetFFRouteProducts404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFDeliveriesGetFFRouteProductsQueryKey(id)

  const query = useQuery({
    ...(FFDeliveriesGetFFRouteProductsQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<FFDeliveriesGetFFRouteProducts400Type | FFDeliveriesGetFFRouteProducts401Type | FFDeliveriesGetFFRouteProducts404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}