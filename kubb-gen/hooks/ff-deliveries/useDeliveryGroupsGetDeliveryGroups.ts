import client from '@/modules/auth/axios-client'
import type { DeliveryGroupsGetDeliveryGroupsQueryResponseType } from '../../types/ff-deliveries/DeliveryGroupsGetDeliveryGroupsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const deliveryGroupsGetDeliveryGroupsQueryKey = () => [{ url: '/ff-deliveries/groups' }] as const

export type DeliveryGroupsGetDeliveryGroupsQueryKey = ReturnType<typeof deliveryGroupsGetDeliveryGroupsQueryKey>

/**
 * @summary Получить список групп поставок
 * {@link /ff-deliveries/groups}
 */
export async function deliveryGroupsGetDeliveryGroups(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveryGroupsGetDeliveryGroupsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-deliveries/groups`,
    ...requestConfig,
  })
  return res.data
}

export function deliveryGroupsGetDeliveryGroupsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = deliveryGroupsGetDeliveryGroupsQueryKey()
  return queryOptions<
    DeliveryGroupsGetDeliveryGroupsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryGroupsGetDeliveryGroupsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveryGroupsGetDeliveryGroups(config)
    },
  })
}

/**
 * @summary Получить список групп поставок
 * {@link /ff-deliveries/groups}
 */
export function useDeliveryGroupsGetDeliveryGroups<
  TData = DeliveryGroupsGetDeliveryGroupsQueryResponseType,
  TQueryData = DeliveryGroupsGetDeliveryGroupsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryGroupsGetDeliveryGroupsQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<DeliveryGroupsGetDeliveryGroupsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveryGroupsGetDeliveryGroupsQueryKey()

  const query = useQuery({
    ...(deliveryGroupsGetDeliveryGroupsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}