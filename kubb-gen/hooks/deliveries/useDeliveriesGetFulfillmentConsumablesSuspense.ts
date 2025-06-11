import client from '@/modules/auth/axios-client'
import type {
  DeliveriesGetFulfillmentConsumablesQueryResponseType,
  DeliveriesGetFulfillmentConsumables401Type,
} from '../../types/deliveries/DeliveriesGetFulfillmentConsumablesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const deliveriesGetFulfillmentConsumablesSuspenseQueryKey = () => [{ url: '/deliveries/consumables' }] as const

export type DeliveriesGetFulfillmentConsumablesSuspenseQueryKey = ReturnType<typeof deliveriesGetFulfillmentConsumablesSuspenseQueryKey>

/**
 * @description Возвращает список всех расходных материалов текущего фулфилмент-центра
 * @summary Получение списка расходных материалов
 * {@link /deliveries/consumables}
 */
export async function deliveriesGetFulfillmentConsumablesSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveriesGetFulfillmentConsumablesQueryResponseType, ResponseErrorConfig<DeliveriesGetFulfillmentConsumables401Type>, unknown>({
    method: 'GET',
    url: `/deliveries/consumables`,
    ...requestConfig,
  })
  return res.data
}

export function deliveriesGetFulfillmentConsumablesSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = deliveriesGetFulfillmentConsumablesSuspenseQueryKey()
  return queryOptions<
    DeliveriesGetFulfillmentConsumablesQueryResponseType,
    ResponseErrorConfig<DeliveriesGetFulfillmentConsumables401Type>,
    DeliveriesGetFulfillmentConsumablesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveriesGetFulfillmentConsumablesSuspense(config)
    },
  })
}

/**
 * @description Возвращает список всех расходных материалов текущего фулфилмент-центра
 * @summary Получение списка расходных материалов
 * {@link /deliveries/consumables}
 */
export function useDeliveriesGetFulfillmentConsumablesSuspense<
  TData = DeliveriesGetFulfillmentConsumablesQueryResponseType,
  TQueryData = DeliveriesGetFulfillmentConsumablesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetFulfillmentConsumablesSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveriesGetFulfillmentConsumablesQueryResponseType,
        ResponseErrorConfig<DeliveriesGetFulfillmentConsumables401Type>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveriesGetFulfillmentConsumablesSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(deliveriesGetFulfillmentConsumablesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<DeliveriesGetFulfillmentConsumables401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}