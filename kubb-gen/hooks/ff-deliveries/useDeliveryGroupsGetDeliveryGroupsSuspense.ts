import client from '@/modules/auth/axios-client'
import type { DeliveryGroupsGetDeliveryGroupsQueryResponseType } from '../../types/ff-deliveries/DeliveryGroupsGetDeliveryGroupsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const deliveryGroupsGetDeliveryGroupsSuspenseQueryKey = () => [{ url: '/ff-deliveries/groups' }] as const

export type DeliveryGroupsGetDeliveryGroupsSuspenseQueryKey = ReturnType<typeof deliveryGroupsGetDeliveryGroupsSuspenseQueryKey>

/**
 * @summary Получить список групп поставок
 * {@link /ff-deliveries/groups}
 */
export async function deliveryGroupsGetDeliveryGroupsSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveryGroupsGetDeliveryGroupsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-deliveries/groups`,
    ...requestConfig,
  })
  return res.data
}

export function deliveryGroupsGetDeliveryGroupsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = deliveryGroupsGetDeliveryGroupsSuspenseQueryKey()
  return queryOptions<
    DeliveryGroupsGetDeliveryGroupsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryGroupsGetDeliveryGroupsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveryGroupsGetDeliveryGroupsSuspense(config)
    },
  })
}

/**
 * @summary Получить список групп поставок
 * {@link /ff-deliveries/groups}
 */
export function useDeliveryGroupsGetDeliveryGroupsSuspense<
  TData = DeliveryGroupsGetDeliveryGroupsQueryResponseType,
  TQueryData = DeliveryGroupsGetDeliveryGroupsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryGroupsGetDeliveryGroupsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<DeliveryGroupsGetDeliveryGroupsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveryGroupsGetDeliveryGroupsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(deliveryGroupsGetDeliveryGroupsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}