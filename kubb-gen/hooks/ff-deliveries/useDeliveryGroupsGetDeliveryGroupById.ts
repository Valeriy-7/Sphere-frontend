import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
  DeliveryGroupsGetDeliveryGroupByIdPathParamsType,
  DeliveryGroupsGetDeliveryGroupById404Type,
} from '../../types/ff-deliveries/DeliveryGroupsGetDeliveryGroupByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const deliveryGroupsGetDeliveryGroupByIdQueryKey = (groupId: DeliveryGroupsGetDeliveryGroupByIdPathParamsType['groupId']) =>
  [{ url: '/ff-deliveries/groups/:groupId', params: { groupId: groupId } }] as const

export type DeliveryGroupsGetDeliveryGroupByIdQueryKey = ReturnType<typeof deliveryGroupsGetDeliveryGroupByIdQueryKey>

/**
 * @summary Получить детали группы поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export async function deliveryGroupsGetDeliveryGroupById(
  groupId: DeliveryGroupsGetDeliveryGroupByIdPathParamsType['groupId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveryGroupsGetDeliveryGroupByIdQueryResponseType, ResponseErrorConfig<DeliveryGroupsGetDeliveryGroupById404Type>, unknown>({
    method: 'GET',
    url: `/ff-deliveries/groups/${groupId}`,
    ...requestConfig,
  })
  return res.data
}

export function deliveryGroupsGetDeliveryGroupByIdQueryOptions(
  groupId: DeliveryGroupsGetDeliveryGroupByIdPathParamsType['groupId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryGroupsGetDeliveryGroupByIdQueryKey(groupId)
  return queryOptions<
    DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
    ResponseErrorConfig<DeliveryGroupsGetDeliveryGroupById404Type>,
    DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!groupId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveryGroupsGetDeliveryGroupById(groupId, config)
    },
  })
}

/**
 * @summary Получить детали группы поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export function useDeliveryGroupsGetDeliveryGroupById<
  TData = DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
  TQueryData = DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
  TQueryKey extends QueryKey = DeliveryGroupsGetDeliveryGroupByIdQueryKey,
>(
  groupId: DeliveryGroupsGetDeliveryGroupByIdPathParamsType['groupId'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
        ResponseErrorConfig<DeliveryGroupsGetDeliveryGroupById404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveryGroupsGetDeliveryGroupByIdQueryKey(groupId)

  const query = useQuery({
    ...(deliveryGroupsGetDeliveryGroupByIdQueryOptions(groupId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<DeliveryGroupsGetDeliveryGroupById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}