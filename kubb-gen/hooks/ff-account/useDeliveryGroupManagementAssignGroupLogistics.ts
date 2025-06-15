import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupManagementAssignGroupLogisticsMutationRequestType,
  DeliveryGroupManagementAssignGroupLogisticsMutationResponseType,
  DeliveryGroupManagementAssignGroupLogistics400Type,
  DeliveryGroupManagementAssignGroupLogistics404Type,
} from '../../types/ff-account/DeliveryGroupManagementAssignGroupLogisticsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deliveryGroupManagementAssignGroupLogisticsMutationKey = () => [{ url: '/ff-account/delivery-groups/assign-logistics' }] as const

export type DeliveryGroupManagementAssignGroupLogisticsMutationKey = ReturnType<typeof deliveryGroupManagementAssignGroupLogisticsMutationKey>

/**
 * @description Назначает тип логистики для нескольких поставок одновременно
 * @summary Назначить тип логистики для группы поставок
 * {@link /ff-account/delivery-groups/assign-logistics}
 */
export async function deliveryGroupManagementAssignGroupLogistics(
  data: DeliveryGroupManagementAssignGroupLogisticsMutationRequestType,
  config: Partial<RequestConfig<DeliveryGroupManagementAssignGroupLogisticsMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveryGroupManagementAssignGroupLogisticsMutationResponseType,
    ResponseErrorConfig<DeliveryGroupManagementAssignGroupLogistics400Type | DeliveryGroupManagementAssignGroupLogistics404Type>,
    DeliveryGroupManagementAssignGroupLogisticsMutationRequestType
  >({ method: 'POST', url: `/ff-account/delivery-groups/assign-logistics`, data, ...requestConfig })
  return res.data
}

/**
 * @description Назначает тип логистики для нескольких поставок одновременно
 * @summary Назначить тип логистики для группы поставок
 * {@link /ff-account/delivery-groups/assign-logistics}
 */
export function useDeliveryGroupManagementAssignGroupLogistics<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveryGroupManagementAssignGroupLogisticsMutationResponseType,
      ResponseErrorConfig<DeliveryGroupManagementAssignGroupLogistics400Type | DeliveryGroupManagementAssignGroupLogistics404Type>,
      { data: DeliveryGroupManagementAssignGroupLogisticsMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveryGroupManagementAssignGroupLogisticsMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveryGroupManagementAssignGroupLogisticsMutationKey()

  return useMutation<
    DeliveryGroupManagementAssignGroupLogisticsMutationResponseType,
    ResponseErrorConfig<DeliveryGroupManagementAssignGroupLogistics400Type | DeliveryGroupManagementAssignGroupLogistics404Type>,
    { data: DeliveryGroupManagementAssignGroupLogisticsMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return deliveryGroupManagementAssignGroupLogistics(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}