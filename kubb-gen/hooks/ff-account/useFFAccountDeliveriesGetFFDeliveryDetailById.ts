import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
  FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType,
  FFAccountDeliveriesGetFFDeliveryDetailById404Type,
} from '../../types/ff-account/FFAccountDeliveriesGetFFDeliveryDetailByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFAccountDeliveriesGetFFDeliveryDetailByIdQueryKey = (id: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType['id']) =>
  [{ url: '/ff-account/deliveries/:id', params: { id: id } }] as const

export type FFAccountDeliveriesGetFFDeliveryDetailByIdQueryKey = ReturnType<typeof FFAccountDeliveriesGetFFDeliveryDetailByIdQueryKey>

/**
 * @summary Получить детали поставки по ID с группировкой товаров по поставщикам
 * {@link /ff-account/deliveries/:id}
 */
export async function FFAccountDeliveriesGetFFDeliveryDetailById(
  id: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
    ResponseErrorConfig<FFAccountDeliveriesGetFFDeliveryDetailById404Type>,
    unknown
  >({ method: 'GET', url: `/ff-account/deliveries/${id}`, ...requestConfig })
  return res.data
}

export function FFAccountDeliveriesGetFFDeliveryDetailByIdQueryOptions(
  id: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFAccountDeliveriesGetFFDeliveryDetailByIdQueryKey(id)
  return queryOptions<
    FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
    ResponseErrorConfig<FFAccountDeliveriesGetFFDeliveryDetailById404Type>,
    FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFAccountDeliveriesGetFFDeliveryDetailById(id, config)
    },
  })
}

/**
 * @summary Получить детали поставки по ID с группировкой товаров по поставщикам
 * {@link /ff-account/deliveries/:id}
 */
export function useFFAccountDeliveriesGetFFDeliveryDetailById<
  TData = FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
  TQueryData = FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetFFDeliveryDetailByIdQueryKey,
>(
  id: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
        ResponseErrorConfig<FFAccountDeliveriesGetFFDeliveryDetailById404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountDeliveriesGetFFDeliveryDetailByIdQueryKey(id)

  const query = useQuery({
    ...(FFAccountDeliveriesGetFFDeliveryDetailByIdQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<FFAccountDeliveriesGetFFDeliveryDetailById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}