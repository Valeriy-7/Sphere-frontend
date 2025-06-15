import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupsCreateDeliveryGroupMutationRequestType,
  DeliveryGroupsCreateDeliveryGroupMutationResponseType,
  DeliveryGroupsCreateDeliveryGroup400Type,
  DeliveryGroupsCreateDeliveryGroup404Type,
} from '../../types/ff-deliveries/DeliveryGroupsCreateDeliveryGroupType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deliveryGroupsCreateDeliveryGroupMutationKey = () => [{ url: '/ff-deliveries/groups' }] as const

export type DeliveryGroupsCreateDeliveryGroupMutationKey = ReturnType<typeof deliveryGroupsCreateDeliveryGroupMutationKey>

/**
 * @summary Создать группу поставок
 * {@link /ff-deliveries/groups}
 */
export async function deliveryGroupsCreateDeliveryGroup(
  data: DeliveryGroupsCreateDeliveryGroupMutationRequestType,
  config: Partial<RequestConfig<DeliveryGroupsCreateDeliveryGroupMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveryGroupsCreateDeliveryGroupMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsCreateDeliveryGroup400Type | DeliveryGroupsCreateDeliveryGroup404Type>,
    DeliveryGroupsCreateDeliveryGroupMutationRequestType
  >({ method: 'POST', url: `/ff-deliveries/groups`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Создать группу поставок
 * {@link /ff-deliveries/groups}
 */
export function useDeliveryGroupsCreateDeliveryGroup<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveryGroupsCreateDeliveryGroupMutationResponseType,
      ResponseErrorConfig<DeliveryGroupsCreateDeliveryGroup400Type | DeliveryGroupsCreateDeliveryGroup404Type>,
      { data: DeliveryGroupsCreateDeliveryGroupMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveryGroupsCreateDeliveryGroupMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveryGroupsCreateDeliveryGroupMutationKey()

  return useMutation<
    DeliveryGroupsCreateDeliveryGroupMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsCreateDeliveryGroup400Type | DeliveryGroupsCreateDeliveryGroup404Type>,
    { data: DeliveryGroupsCreateDeliveryGroupMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return deliveryGroupsCreateDeliveryGroup(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}