import client from '@/modules/auth/axios-client'
import type {
  DeliveryPointsGetDeliveryPointsQueryResponseType,
  DeliveryPointsGetDeliveryPointsQueryParamsType,
} from '../../types/services/DeliveryPointsGetDeliveryPointsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const deliveryPointsGetDeliveryPointsSuspenseQueryKey = (params?: DeliveryPointsGetDeliveryPointsQueryParamsType) =>
  [{ url: '/services/delivery-points' }, ...(params ? [params] : [])] as const

export type DeliveryPointsGetDeliveryPointsSuspenseQueryKey = ReturnType<typeof deliveryPointsGetDeliveryPointsSuspenseQueryKey>

/**
 * @description Возвращает список точек доставки с их адресами. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе. Если указан параметр onlyPartners=true, будут возвращены только партнерские точки доставки.
 * @summary Получить список точек доставки
 * {@link /services/delivery-points}
 */
export async function deliveryPointsGetDeliveryPointsSuspense(
  params?: DeliveryPointsGetDeliveryPointsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveryPointsGetDeliveryPointsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/services/delivery-points`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function deliveryPointsGetDeliveryPointsSuspenseQueryOptions(
  params?: DeliveryPointsGetDeliveryPointsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryPointsGetDeliveryPointsSuspenseQueryKey(params)
  return queryOptions<
    DeliveryPointsGetDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryPointsGetDeliveryPointsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveryPointsGetDeliveryPointsSuspense(params, config)
    },
  })
}

/**
 * @description Возвращает список точек доставки с их адресами. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе. Если указан параметр onlyPartners=true, будут возвращены только партнерские точки доставки.
 * @summary Получить список точек доставки
 * {@link /services/delivery-points}
 */
export function useDeliveryPointsGetDeliveryPointsSuspense<
  TData = DeliveryPointsGetDeliveryPointsQueryResponseType,
  TQueryData = DeliveryPointsGetDeliveryPointsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryPointsGetDeliveryPointsSuspenseQueryKey,
>(
  params?: DeliveryPointsGetDeliveryPointsQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<DeliveryPointsGetDeliveryPointsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveryPointsGetDeliveryPointsSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(deliveryPointsGetDeliveryPointsSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}