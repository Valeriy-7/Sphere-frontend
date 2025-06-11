import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
  FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType,
  FFAccountDeliveriesGetFFDeliveryDetailById404Type,
} from '../../types/ff-account/FFAccountDeliveriesGetFFDeliveryDetailByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryKey = (id: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType['id']) =>
  [{ url: '/ff-account/deliveries/:id', params: { id: id } }] as const

export type FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryKey = ReturnType<typeof FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryKey>

/**
 * @summary Получить детали поставки по ID с группировкой товаров по поставщикам
 * {@link /ff-account/deliveries/:id}
 */
export async function FFAccountDeliveriesGetFFDeliveryDetailByIdSuspense(
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

export function FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryOptions(
  id: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryKey(id)
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
      return FFAccountDeliveriesGetFFDeliveryDetailByIdSuspense(id, config)
    },
  })
}

/**
 * @summary Получить детали поставки по ID с группировкой товаров по поставщикам
 * {@link /ff-account/deliveries/:id}
 */
export function useFFAccountDeliveriesGetFFDeliveryDetailByIdSuspense<
  TData = FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
  TQueryData = FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryKey,
>(
  id: FFAccountDeliveriesGetFFDeliveryDetailByIdPathParamsType['id'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFAccountDeliveriesGetFFDeliveryDetailByIdQueryResponseType,
        ResponseErrorConfig<FFAccountDeliveriesGetFFDeliveryDetailById404Type>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(FFAccountDeliveriesGetFFDeliveryDetailByIdSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FFAccountDeliveriesGetFFDeliveryDetailById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}