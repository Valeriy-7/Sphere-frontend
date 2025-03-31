import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type {
  FFDeliveriesGetFFDeliveryProductsQueryResponseType,
  FFDeliveriesGetFFDeliveryProductsPathParamsType,
  FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  FFDeliveriesGetFFDeliveryProducts400Type,
  FFDeliveriesGetFFDeliveryProducts401Type,
  FFDeliveriesGetFFDeliveryProducts404Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFDeliveryProductsType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFDeliveriesGetFFDeliveryProductsQueryKey = (
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
) => [{ url: '/ff-deliveries/:id/products', params: { id: id } }, ...(params ? [params] : [])] as const

export type FFDeliveriesGetFFDeliveryProductsQueryKey = ReturnType<typeof FFDeliveriesGetFFDeliveryProductsQueryKey>

/**
 * @description Возвращает список товаров для конкретной поставки на ФФ с возможностью фильтрации по поставщику. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров в поставке на ФФ
 * {@link /ff-deliveries/:id/products}
 */
export async function FFDeliveriesGetFFDeliveryProducts(
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFDeliveriesGetFFDeliveryProductsQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFDeliveryProducts400Type | FFDeliveriesGetFFDeliveryProducts401Type | FFDeliveriesGetFFDeliveryProducts404Type>,
    unknown
  >({ method: 'GET', url: `/ff-deliveries/${id}/products`, params, ...requestConfig })
  return res.data
}

export function FFDeliveriesGetFFDeliveryProductsQueryOptions(
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFDeliveryProductsQueryKey(id, params)
  return queryOptions<
    FFDeliveriesGetFFDeliveryProductsQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFDeliveryProducts400Type | FFDeliveriesGetFFDeliveryProducts401Type | FFDeliveriesGetFFDeliveryProducts404Type>,
    FFDeliveriesGetFFDeliveryProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFDeliveriesGetFFDeliveryProducts(id, params, config)
    },
  })
}

/**
 * @description Возвращает список товаров для конкретной поставки на ФФ с возможностью фильтрации по поставщику. После создания поставки значения factQuantity и defects равны null или "-".
 * @summary Получить список товаров в поставке на ФФ
 * {@link /ff-deliveries/:id/products}
 */
export function useFFDeliveriesGetFFDeliveryProducts<
  TData = FFDeliveriesGetFFDeliveryProductsQueryResponseType,
  TQueryData = FFDeliveriesGetFFDeliveryProductsQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFDeliveryProductsQueryKey,
>(
  id: FFDeliveriesGetFFDeliveryProductsPathParamsType['id'],
  params?: FFDeliveriesGetFFDeliveryProductsQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        FFDeliveriesGetFFDeliveryProductsQueryResponseType,
        ResponseErrorConfig<FFDeliveriesGetFFDeliveryProducts400Type | FFDeliveriesGetFFDeliveryProducts401Type | FFDeliveriesGetFFDeliveryProducts404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFDeliveriesGetFFDeliveryProductsQueryKey(id, params)

  const query = useQuery({
    ...(FFDeliveriesGetFFDeliveryProductsQueryOptions(id, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<FFDeliveriesGetFFDeliveryProducts400Type | FFDeliveriesGetFFDeliveryProducts401Type | FFDeliveriesGetFFDeliveryProducts404Type>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}