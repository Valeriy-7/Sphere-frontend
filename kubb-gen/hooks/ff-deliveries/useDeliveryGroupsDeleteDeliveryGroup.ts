import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupsDeleteDeliveryGroupMutationResponseType,
  DeliveryGroupsDeleteDeliveryGroupPathParamsType,
  DeliveryGroupsDeleteDeliveryGroup400Type,
  DeliveryGroupsDeleteDeliveryGroup404Type,
} from '../../types/ff-deliveries/DeliveryGroupsDeleteDeliveryGroupType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deliveryGroupsDeleteDeliveryGroupMutationKey = () => [{ url: '/ff-deliveries/groups/{groupId}' }] as const

export type DeliveryGroupsDeleteDeliveryGroupMutationKey = ReturnType<typeof deliveryGroupsDeleteDeliveryGroupMutationKey>

/**
 * @summary Удалить группу поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export async function deliveryGroupsDeleteDeliveryGroup(
  groupId: DeliveryGroupsDeleteDeliveryGroupPathParamsType['groupId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveryGroupsDeleteDeliveryGroupMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsDeleteDeliveryGroup400Type | DeliveryGroupsDeleteDeliveryGroup404Type>,
    unknown
  >({ method: 'DELETE', url: `/ff-deliveries/groups/${groupId}`, ...requestConfig })
  return res.data
}

/**
 * @summary Удалить группу поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export function useDeliveryGroupsDeleteDeliveryGroup<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveryGroupsDeleteDeliveryGroupMutationResponseType,
      ResponseErrorConfig<DeliveryGroupsDeleteDeliveryGroup400Type | DeliveryGroupsDeleteDeliveryGroup404Type>,
      { groupId: DeliveryGroupsDeleteDeliveryGroupPathParamsType['groupId'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveryGroupsDeleteDeliveryGroupMutationKey()

  return useMutation<
    DeliveryGroupsDeleteDeliveryGroupMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsDeleteDeliveryGroup400Type | DeliveryGroupsDeleteDeliveryGroup404Type>,
    { groupId: DeliveryGroupsDeleteDeliveryGroupPathParamsType['groupId'] },
    TContext
  >({
    mutationFn: async ({ groupId }) => {
      return deliveryGroupsDeleteDeliveryGroup(groupId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}