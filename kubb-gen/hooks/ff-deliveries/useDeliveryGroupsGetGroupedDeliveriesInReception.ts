import client from '@/modules/auth/axios-client'
import type { DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType } from '../../types/ff-deliveries/DeliveryGroupsGetGroupedDeliveriesInReceptionType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const deliveryGroupsGetGroupedDeliveriesInReceptionQueryKey = () => [{ url: '/ff-deliveries/groups/reception' }] as const

export type DeliveryGroupsGetGroupedDeliveriesInReceptionQueryKey = ReturnType<typeof deliveryGroupsGetGroupedDeliveriesInReceptionQueryKey>

/**
 * @summary Получить сгруппированные поставки в приемке
 * {@link /ff-deliveries/groups/reception}
 */
export async function deliveryGroupsGetGroupedDeliveriesInReception(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-deliveries/groups/reception`,
    ...requestConfig,
  })
  return res.data
}

export function deliveryGroupsGetGroupedDeliveriesInReceptionQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = deliveryGroupsGetGroupedDeliveriesInReceptionQueryKey()
  return queryOptions<
    DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveryGroupsGetGroupedDeliveriesInReception(config)
    },
  })
}

/**
 * @summary Получить сгруппированные поставки в приемке
 * {@link /ff-deliveries/groups/reception}
 */
export function useDeliveryGroupsGetGroupedDeliveriesInReception<
  TData = DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
  TQueryData = DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
  TQueryKey extends QueryKey = DeliveryGroupsGetGroupedDeliveriesInReceptionQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveryGroupsGetGroupedDeliveriesInReceptionQueryKey()

  const query = useQuery({
    ...(deliveryGroupsGetGroupedDeliveriesInReceptionQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}