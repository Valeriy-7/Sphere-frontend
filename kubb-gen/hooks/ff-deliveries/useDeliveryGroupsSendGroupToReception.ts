import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupsSendGroupToReceptionMutationRequestType,
  DeliveryGroupsSendGroupToReceptionMutationResponseType,
  DeliveryGroupsSendGroupToReceptionPathParamsType,
  DeliveryGroupsSendGroupToReception400Type,
  DeliveryGroupsSendGroupToReception404Type,
} from '../../types/ff-deliveries/DeliveryGroupsSendGroupToReceptionType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deliveryGroupsSendGroupToReceptionMutationKey = () => [{ url: '/ff-deliveries/groups/{groupId}/send-to-reception' }] as const

export type DeliveryGroupsSendGroupToReceptionMutationKey = ReturnType<typeof deliveryGroupsSendGroupToReceptionMutationKey>

/**
 * @summary Отправить группу поставок в приемку
 * {@link /ff-deliveries/groups/:groupId/send-to-reception}
 */
export async function deliveryGroupsSendGroupToReception(
  groupId: DeliveryGroupsSendGroupToReceptionPathParamsType['groupId'],
  data: DeliveryGroupsSendGroupToReceptionMutationRequestType,
  config: Partial<RequestConfig<DeliveryGroupsSendGroupToReceptionMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveryGroupsSendGroupToReceptionMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsSendGroupToReception400Type | DeliveryGroupsSendGroupToReception404Type>,
    DeliveryGroupsSendGroupToReceptionMutationRequestType
  >({ method: 'POST', url: `/ff-deliveries/groups/${groupId}/send-to-reception`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Отправить группу поставок в приемку
 * {@link /ff-deliveries/groups/:groupId/send-to-reception}
 */
export function useDeliveryGroupsSendGroupToReception<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveryGroupsSendGroupToReceptionMutationResponseType,
      ResponseErrorConfig<DeliveryGroupsSendGroupToReception400Type | DeliveryGroupsSendGroupToReception404Type>,
      { groupId: DeliveryGroupsSendGroupToReceptionPathParamsType['groupId']; data: DeliveryGroupsSendGroupToReceptionMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveryGroupsSendGroupToReceptionMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveryGroupsSendGroupToReceptionMutationKey()

  return useMutation<
    DeliveryGroupsSendGroupToReceptionMutationResponseType,
    ResponseErrorConfig<DeliveryGroupsSendGroupToReception400Type | DeliveryGroupsSendGroupToReception404Type>,
    { groupId: DeliveryGroupsSendGroupToReceptionPathParamsType['groupId']; data: DeliveryGroupsSendGroupToReceptionMutationRequestType },
    TContext
  >({
    mutationFn: async ({ groupId, data }) => {
      return deliveryGroupsSendGroupToReception(groupId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}