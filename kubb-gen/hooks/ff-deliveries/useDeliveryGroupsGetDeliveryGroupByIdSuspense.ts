import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
  DeliveryGroupsGetDeliveryGroupByIdPathParamsType,
  DeliveryGroupsGetDeliveryGroupById404Type,
} from '../../types/ff-deliveries/DeliveryGroupsGetDeliveryGroupByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const deliveryGroupsGetDeliveryGroupByIdSuspenseQueryKey = (groupId: DeliveryGroupsGetDeliveryGroupByIdPathParamsType['groupId']) =>
  [{ url: '/ff-deliveries/groups/:groupId', params: { groupId: groupId } }] as const

export type DeliveryGroupsGetDeliveryGroupByIdSuspenseQueryKey = ReturnType<typeof deliveryGroupsGetDeliveryGroupByIdSuspenseQueryKey>

/**
 * @summary Получить детали группы поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export async function deliveryGroupsGetDeliveryGroupByIdSuspense(
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

export function deliveryGroupsGetDeliveryGroupByIdSuspenseQueryOptions(
  groupId: DeliveryGroupsGetDeliveryGroupByIdPathParamsType['groupId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryGroupsGetDeliveryGroupByIdSuspenseQueryKey(groupId)
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
      return deliveryGroupsGetDeliveryGroupByIdSuspense(groupId, config)
    },
  })
}

/**
 * @summary Получить детали группы поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export function useDeliveryGroupsGetDeliveryGroupByIdSuspense<
  TData = DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
  TQueryData = DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
  TQueryKey extends QueryKey = DeliveryGroupsGetDeliveryGroupByIdSuspenseQueryKey,
>(
  groupId: DeliveryGroupsGetDeliveryGroupByIdPathParamsType['groupId'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveryGroupsGetDeliveryGroupByIdQueryResponseType,
        ResponseErrorConfig<DeliveryGroupsGetDeliveryGroupById404Type>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveryGroupsGetDeliveryGroupByIdSuspenseQueryKey(groupId)

  const query = useSuspenseQuery({
    ...(deliveryGroupsGetDeliveryGroupByIdSuspenseQueryOptions(groupId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<DeliveryGroupsGetDeliveryGroupById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}