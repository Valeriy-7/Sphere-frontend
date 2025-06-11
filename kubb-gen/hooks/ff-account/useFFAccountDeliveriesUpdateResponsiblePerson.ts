import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType,
  FFAccountDeliveriesUpdateResponsiblePersonMutationResponseType,
  FFAccountDeliveriesUpdateResponsiblePersonPathParamsType,
  FFAccountDeliveriesUpdateResponsiblePerson404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateResponsiblePersonType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateResponsiblePersonMutationKey = () => [{ url: '/ff-account/deliveries/{id}/responsible' }] as const

export type FFAccountDeliveriesUpdateResponsiblePersonMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateResponsiblePersonMutationKey>

/**
 * @description Назначает ответственного сотрудника по ID без изменения статуса поставки.
 * @summary Назначить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible}
 */
export async function FFAccountDeliveriesUpdateResponsiblePerson(
  id: FFAccountDeliveriesUpdateResponsiblePersonPathParamsType['id'],
  data: FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateResponsiblePerson404Type>,
    FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/responsible`, data, ...requestConfig })
  return res.data
}

/**
 * @description Назначает ответственного сотрудника по ID без изменения статуса поставки.
 * @summary Назначить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible}
 */
export function useFFAccountDeliveriesUpdateResponsiblePerson<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateResponsiblePersonMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateResponsiblePerson404Type>,
      { id: FFAccountDeliveriesUpdateResponsiblePersonPathParamsType['id']; data: FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateResponsiblePersonMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateResponsiblePerson404Type>,
    { id: FFAccountDeliveriesUpdateResponsiblePersonPathParamsType['id']; data: FFAccountDeliveriesUpdateResponsiblePersonMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateResponsiblePerson(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}