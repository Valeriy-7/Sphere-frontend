import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupsUpdateDeliveryGroupMutationRequestType,
  DeliveryGroupsUpdateDeliveryGroupMutationResponseType,
  DeliveryGroupsUpdateDeliveryGroupPathParamsType,
  DeliveryGroupsUpdateDeliveryGroup400Type,
  DeliveryGroupsUpdateDeliveryGroup404Type,
} from '../../types/ff-deliveries/DeliveryGroupsUpdateDeliveryGroupType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deliveryGroupsUpdateDeliveryGroupMutationKey = () => [{ url: '/ff-deliveries/groups/{groupId}' }] as const

export type DeliveryGroupsUpdateDeliveryGroupMutationKey = ReturnType<typeof deliveryGroupsUpdateDeliveryGroupMutationKey>

/**
 * @summary Обновить группу поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export async function deliveryGroupsUpdateDeliveryGroup(
  groupId: DeliveryGroupsUpdateDeliveryGroupPathParamsType['groupId'],
  data?: DeliveryGroupsUpdateDeliveryGroupMutationRequestType,
  config: Partial<RequestConfig<DeliveryGroupsUpdateDeliveryGroupMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveryGroupsUpdateDeliveryGroupMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsUpdateDeliveryGroup400Type | DeliveryGroupsUpdateDeliveryGroup404Type>,
    DeliveryGroupsUpdateDeliveryGroupMutationRequestType
  >({ method: 'PUT', url: `/ff-deliveries/groups/${groupId}`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Обновить группу поставок
 * {@link /ff-deliveries/groups/:groupId}
 */
export function useDeliveryGroupsUpdateDeliveryGroup<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveryGroupsUpdateDeliveryGroupMutationResponseType,
      ResponseErrorConfig<DeliveryGroupsUpdateDeliveryGroup400Type | DeliveryGroupsUpdateDeliveryGroup404Type>,
      { groupId: DeliveryGroupsUpdateDeliveryGroupPathParamsType['groupId']; data?: DeliveryGroupsUpdateDeliveryGroupMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveryGroupsUpdateDeliveryGroupMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveryGroupsUpdateDeliveryGroupMutationKey()

  return useMutation<
    DeliveryGroupsUpdateDeliveryGroupMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsUpdateDeliveryGroup400Type | DeliveryGroupsUpdateDeliveryGroup404Type>,
    { groupId: DeliveryGroupsUpdateDeliveryGroupPathParamsType['groupId']; data?: DeliveryGroupsUpdateDeliveryGroupMutationRequestType },
    TContext
  >({
    mutationFn: async ({ groupId, data }) => {
      return deliveryGroupsUpdateDeliveryGroup(groupId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}