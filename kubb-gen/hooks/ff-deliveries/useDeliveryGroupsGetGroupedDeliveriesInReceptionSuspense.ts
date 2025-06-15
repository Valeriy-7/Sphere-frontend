import client from '@/modules/auth/axios-client'
import type { DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType } from '../../types/ff-deliveries/DeliveryGroupsGetGroupedDeliveriesInReceptionType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const deliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryKey = () => [{ url: '/ff-deliveries/groups/reception' }] as const

export type DeliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryKey = ReturnType<typeof deliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryKey>

/**
 * @summary Получить сгруппированные поставки в приемке
 * {@link /ff-deliveries/groups/reception}
 */
export async function deliveryGroupsGetGroupedDeliveriesInReceptionSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-deliveries/groups/reception`,
    ...requestConfig,
  })
  return res.data
}

export function deliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = deliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryKey()
  return queryOptions<
    DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveryGroupsGetGroupedDeliveriesInReceptionSuspense(config)
    },
  })
}

/**
 * @summary Получить сгруппированные поставки в приемке
 * {@link /ff-deliveries/groups/reception}
 */
export function useDeliveryGroupsGetGroupedDeliveriesInReceptionSuspense<
  TData = DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
  TQueryData = DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType,
  TQueryKey extends QueryKey = DeliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<DeliveryGroupsGetGroupedDeliveriesInReceptionQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(deliveryGroupsGetGroupedDeliveriesInReceptionSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}