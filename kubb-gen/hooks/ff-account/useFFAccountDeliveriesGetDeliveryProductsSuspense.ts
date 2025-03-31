import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type {
  FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
  FFAccountDeliveriesGetDeliveryProductsPathParamsType,
  FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  FFAccountDeliveriesGetDeliveryProducts404Type,
} from '../../types/ff-account/FFAccountDeliveriesGetDeliveryProductsType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFAccountDeliveriesGetDeliveryProductsSuspenseQueryKey = (
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
) => [{ url: '/ff-account/deliveries/:id/products', params: { id: id } }, ...(params ? [params] : [])] as const

export type FFAccountDeliveriesGetDeliveryProductsSuspenseQueryKey = ReturnType<typeof FFAccountDeliveriesGetDeliveryProductsSuspenseQueryKey>

/**
 * @description Возвращает список товаров для конкретной поставки с возможностью фильтрации по поставщику.
 * @summary Получить товары поставки
 * {@link /ff-account/deliveries/:id/products}
 */
export async function FFAccountDeliveriesGetDeliveryProductsSuspense(
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
    ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>,
    unknown
  >({ method: 'GET', url: `/ff-account/deliveries/${id}/products`, params, ...requestConfig })
  return res.data
}

export function FFAccountDeliveriesGetDeliveryProductsSuspenseQueryOptions(
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFAccountDeliveriesGetDeliveryProductsSuspenseQueryKey(id, params)
  return queryOptions<
    FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
    ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>,
    FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFAccountDeliveriesGetDeliveryProductsSuspense(id, params, config)
    },
  })
}

/**
 * @description Возвращает список товаров для конкретной поставки с возможностью фильтрации по поставщику.
 * @summary Получить товары поставки
 * {@link /ff-account/deliveries/:id/products}
 */
export function useFFAccountDeliveriesGetDeliveryProductsSuspense<
  TData = FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
  TQueryData = FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetDeliveryProductsSuspenseQueryKey,
>(
  id: FFAccountDeliveriesGetDeliveryProductsPathParamsType['id'],
  params?: FFAccountDeliveriesGetDeliveryProductsQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFAccountDeliveriesGetDeliveryProductsQueryResponseType,
        ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountDeliveriesGetDeliveryProductsSuspenseQueryKey(id, params)

  const query = useSuspenseQuery({
    ...(FFAccountDeliveriesGetDeliveryProductsSuspenseQueryOptions(id, params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FFAccountDeliveriesGetDeliveryProducts404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}