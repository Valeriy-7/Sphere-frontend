import client from '@/modules/auth/axios-client'
import type {
  DeliveryGroupManagementAssignGroupResponsibleMutationRequestType,
  DeliveryGroupManagementAssignGroupResponsibleMutationResponseType,
  DeliveryGroupManagementAssignGroupResponsible400Type,
  DeliveryGroupManagementAssignGroupResponsible404Type,
} from '../../types/ff-account/DeliveryGroupManagementAssignGroupResponsibleType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deliveryGroupManagementAssignGroupResponsibleMutationKey = () => [{ url: '/ff-account/delivery-groups/assign-responsible' }] as const

export type DeliveryGroupManagementAssignGroupResponsibleMutationKey = ReturnType<typeof deliveryGroupManagementAssignGroupResponsibleMutationKey>

/**
 * @description Назначает ответственных сотрудников для нескольких поставок одновременно
 * @summary Назначить ответственных для группы поставок
 * {@link /ff-account/delivery-groups/assign-responsible}
 */
export async function deliveryGroupManagementAssignGroupResponsible(
  data: DeliveryGroupManagementAssignGroupResponsibleMutationRequestType,
  config: Partial<RequestConfig<DeliveryGroupManagementAssignGroupResponsibleMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveryGroupManagementAssignGroupResponsibleMutationResponseType,
    ResponseErrorConfig<DeliveryGroupManagementAssignGroupResponsible400Type | DeliveryGroupManagementAssignGroupResponsible404Type>,
    DeliveryGroupManagementAssignGroupResponsibleMutationRequestType
  >({ method: 'POST', url: `/ff-account/delivery-groups/assign-responsible`, data, ...requestConfig })
  return res.data
}

/**
 * @description Назначает ответственных сотрудников для нескольких поставок одновременно
 * @summary Назначить ответственных для группы поставок
 * {@link /ff-account/delivery-groups/assign-responsible}
 */
export function useDeliveryGroupManagementAssignGroupResponsible<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveryGroupManagementAssignGroupResponsibleMutationResponseType,
      ResponseErrorConfig<DeliveryGroupManagementAssignGroupResponsible400Type | DeliveryGroupManagementAssignGroupResponsible404Type>,
      { data: DeliveryGroupManagementAssignGroupResponsibleMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveryGroupManagementAssignGroupResponsibleMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveryGroupManagementAssignGroupResponsibleMutationKey()

  return useMutation<
    DeliveryGroupManagementAssignGroupResponsibleMutationResponseType,
    ResponseErrorConfig<DeliveryGroupManagementAssignGroupResponsible400Type | DeliveryGroupManagementAssignGroupResponsible404Type>,
    { data: DeliveryGroupManagementAssignGroupResponsibleMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return deliveryGroupManagementAssignGroupResponsible(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}