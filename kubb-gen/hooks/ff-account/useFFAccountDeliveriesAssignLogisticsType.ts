import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesAssignLogisticsTypeMutationRequestType,
  FFAccountDeliveriesAssignLogisticsTypeMutationResponseType,
  FFAccountDeliveriesAssignLogisticsTypePathParamsType,
  FFAccountDeliveriesAssignLogisticsType404Type,
} from '../../types/ff-account/FFAccountDeliveriesAssignLogisticsTypeType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesAssignLogisticsTypeMutationKey = () => [{ url: '/ff-account/deliveries/{id}/logistics-type' }] as const

export type FFAccountDeliveriesAssignLogisticsTypeMutationKey = ReturnType<typeof FFAccountDeliveriesAssignLogisticsTypeMutationKey>

/**
 * @summary Назначить тип логистики для поставки
 * {@link /ff-account/deliveries/:id/logistics-type}
 */
export async function FFAccountDeliveriesAssignLogisticsType(
  id: FFAccountDeliveriesAssignLogisticsTypePathParamsType['id'],
  data: FFAccountDeliveriesAssignLogisticsTypeMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesAssignLogisticsTypeMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesAssignLogisticsTypeMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignLogisticsType404Type>,
    FFAccountDeliveriesAssignLogisticsTypeMutationRequestType
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/logistics-type`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Назначить тип логистики для поставки
 * {@link /ff-account/deliveries/:id/logistics-type}
 */
export function useFFAccountDeliveriesAssignLogisticsType<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesAssignLogisticsTypeMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesAssignLogisticsType404Type>,
      { id: FFAccountDeliveriesAssignLogisticsTypePathParamsType['id']; data: FFAccountDeliveriesAssignLogisticsTypeMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesAssignLogisticsTypeMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesAssignLogisticsTypeMutationKey()

  return useMutation<
    FFAccountDeliveriesAssignLogisticsTypeMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignLogisticsType404Type>,
    { id: FFAccountDeliveriesAssignLogisticsTypePathParamsType['id']; data: FFAccountDeliveriesAssignLogisticsTypeMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesAssignLogisticsType(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}