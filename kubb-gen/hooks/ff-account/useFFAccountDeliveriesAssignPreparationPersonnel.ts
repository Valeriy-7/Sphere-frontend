import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType,
  FFAccountDeliveriesAssignPreparationPersonnelMutationResponseType,
  FFAccountDeliveriesAssignPreparationPersonnelPathParamsType,
  FFAccountDeliveriesAssignPreparationPersonnel400Type,
  FFAccountDeliveriesAssignPreparationPersonnel404Type,
} from '../../types/ff-account/FFAccountDeliveriesAssignPreparationPersonnelType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesAssignPreparationPersonnelMutationKey = () => [{ url: '/ff-account/deliveries/{id}/preparation-personnel' }] as const

export type FFAccountDeliveriesAssignPreparationPersonnelMutationKey = ReturnType<typeof FFAccountDeliveriesAssignPreparationPersonnelMutationKey>

/**
 * @description Назначает ответственного и исполнителей для этапа подготовки. Доступно только для поставок в статусе PREPARATION, для которых подготовка еще не начата.
 * @summary (Подготовка/Новые) Назначить персонал для подготовки
 * {@link /ff-account/deliveries/:id/preparation-personnel}
 */
export async function FFAccountDeliveriesAssignPreparationPersonnel(
  id: FFAccountDeliveriesAssignPreparationPersonnelPathParamsType['id'],
  data: FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesAssignPreparationPersonnelMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignPreparationPersonnel400Type | FFAccountDeliveriesAssignPreparationPersonnel404Type>,
    FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/preparation-personnel`, data, ...requestConfig })
  return res.data
}

/**
 * @description Назначает ответственного и исполнителей для этапа подготовки. Доступно только для поставок в статусе PREPARATION, для которых подготовка еще не начата.
 * @summary (Подготовка/Новые) Назначить персонал для подготовки
 * {@link /ff-account/deliveries/:id/preparation-personnel}
 */
export function useFFAccountDeliveriesAssignPreparationPersonnel<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesAssignPreparationPersonnelMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesAssignPreparationPersonnel400Type | FFAccountDeliveriesAssignPreparationPersonnel404Type>,
      { id: FFAccountDeliveriesAssignPreparationPersonnelPathParamsType['id']; data: FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesAssignPreparationPersonnelMutationKey()

  return useMutation<
    FFAccountDeliveriesAssignPreparationPersonnelMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignPreparationPersonnel400Type | FFAccountDeliveriesAssignPreparationPersonnel404Type>,
    { id: FFAccountDeliveriesAssignPreparationPersonnelPathParamsType['id']; data: FFAccountDeliveriesAssignPreparationPersonnelMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesAssignPreparationPersonnel(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}