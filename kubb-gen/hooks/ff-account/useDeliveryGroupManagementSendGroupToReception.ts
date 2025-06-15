import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupManagementSendGroupToReceptionMutationRequestType,
  DeliveryGroupManagementSendGroupToReceptionMutationResponseType,
  DeliveryGroupManagementSendGroupToReception400Type,
  DeliveryGroupManagementSendGroupToReception404Type,
} from '../../types/ff-account/DeliveryGroupManagementSendGroupToReceptionType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deliveryGroupManagementSendGroupToReceptionMutationKey = () => [{ url: '/ff-account/delivery-groups/send-to-reception' }] as const

export type DeliveryGroupManagementSendGroupToReceptionMutationKey = ReturnType<typeof deliveryGroupManagementSendGroupToReceptionMutationKey>

/**
 * @description Отправляет группу поставок в приемку с возможностью назначения ответственных и типа логистики
 * @summary Отправить группу поставок в приемку
 * {@link /ff-account/delivery-groups/send-to-reception}
 */
export async function deliveryGroupManagementSendGroupToReception(
  data: DeliveryGroupManagementSendGroupToReceptionMutationRequestType,
  config: Partial<RequestConfig<DeliveryGroupManagementSendGroupToReceptionMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveryGroupManagementSendGroupToReceptionMutationResponseType,
    ResponseErrorConfig<DeliveryGroupManagementSendGroupToReception400Type | DeliveryGroupManagementSendGroupToReception404Type>,
    DeliveryGroupManagementSendGroupToReceptionMutationRequestType
  >({ method: 'POST', url: `/ff-account/delivery-groups/send-to-reception`, data, ...requestConfig })
  return res.data
}

/**
 * @description Отправляет группу поставок в приемку с возможностью назначения ответственных и типа логистики
 * @summary Отправить группу поставок в приемку
 * {@link /ff-account/delivery-groups/send-to-reception}
 */
export function useDeliveryGroupManagementSendGroupToReception<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveryGroupManagementSendGroupToReceptionMutationResponseType,
      ResponseErrorConfig<DeliveryGroupManagementSendGroupToReception400Type | DeliveryGroupManagementSendGroupToReception404Type>,
      { data: DeliveryGroupManagementSendGroupToReceptionMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveryGroupManagementSendGroupToReceptionMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveryGroupManagementSendGroupToReceptionMutationKey()

  return useMutation<
    DeliveryGroupManagementSendGroupToReceptionMutationResponseType,
    ResponseErrorConfig<DeliveryGroupManagementSendGroupToReception400Type | DeliveryGroupManagementSendGroupToReception404Type>,
    { data: DeliveryGroupManagementSendGroupToReceptionMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return deliveryGroupManagementSendGroupToReception(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}