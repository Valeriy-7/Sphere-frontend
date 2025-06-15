import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesAssignResponsibleMutationRequestType,
  FFAccountDeliveriesAssignResponsibleMutationResponseType,
  FFAccountDeliveriesAssignResponsiblePathParamsType,
  FFAccountDeliveriesAssignResponsible404Type,
} from '../../types/ff-account/FFAccountDeliveriesAssignResponsibleType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesAssignResponsibleMutationKey = () => [{ url: '/ff-account/deliveries/{id}/responsible' }] as const

export type FFAccountDeliveriesAssignResponsibleMutationKey = ReturnType<typeof FFAccountDeliveriesAssignResponsibleMutationKey>

/**
 * @summary Назначить ответственных для поставки (перезаписывает существующих)
 * {@link /ff-account/deliveries/:id/responsible}
 */
export async function FFAccountDeliveriesAssignResponsible(
  id: FFAccountDeliveriesAssignResponsiblePathParamsType['id'],
  data: FFAccountDeliveriesAssignResponsibleMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesAssignResponsibleMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesAssignResponsibleMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignResponsible404Type>,
    FFAccountDeliveriesAssignResponsibleMutationRequestType
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/responsible`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Назначить ответственных для поставки (перезаписывает существующих)
 * {@link /ff-account/deliveries/:id/responsible}
 */
export function useFFAccountDeliveriesAssignResponsible<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesAssignResponsibleMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesAssignResponsible404Type>,
      { id: FFAccountDeliveriesAssignResponsiblePathParamsType['id']; data: FFAccountDeliveriesAssignResponsibleMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesAssignResponsibleMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesAssignResponsibleMutationKey()

  return useMutation<
    FFAccountDeliveriesAssignResponsibleMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignResponsible404Type>,
    { id: FFAccountDeliveriesAssignResponsiblePathParamsType['id']; data: FFAccountDeliveriesAssignResponsibleMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesAssignResponsible(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}