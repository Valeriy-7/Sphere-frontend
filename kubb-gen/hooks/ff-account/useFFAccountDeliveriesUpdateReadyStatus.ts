import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateReadyStatusMutationRequestType,
  FFAccountDeliveriesUpdateReadyStatusMutationResponseType,
  FFAccountDeliveriesUpdateReadyStatusPathParamsType,
  FFAccountDeliveriesUpdateReadyStatus404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateReadyStatusType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateReadyStatusMutationKey = () => [{ url: '/ff-account/deliveries/{id}/ready-status' }] as const

export type FFAccountDeliveriesUpdateReadyStatusMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateReadyStatusMutationKey>

/**
 * @description Обновляет статус готовности поставки для workflow подготовки (новые -> в работу -> в работе).
 * @summary (Подготовка) Обновить статус готовности
 * {@link /ff-account/deliveries/:id/ready-status}
 */
export async function FFAccountDeliveriesUpdateReadyStatus(
  id: FFAccountDeliveriesUpdateReadyStatusPathParamsType['id'],
  data: FFAccountDeliveriesUpdateReadyStatusMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateReadyStatusMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateReadyStatusMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateReadyStatus404Type>,
    FFAccountDeliveriesUpdateReadyStatusMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/ready-status`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет статус готовности поставки для workflow подготовки (новые -> в работу -> в работе).
 * @summary (Подготовка) Обновить статус готовности
 * {@link /ff-account/deliveries/:id/ready-status}
 */
export function useFFAccountDeliveriesUpdateReadyStatus<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateReadyStatusMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateReadyStatus404Type>,
      { id: FFAccountDeliveriesUpdateReadyStatusPathParamsType['id']; data: FFAccountDeliveriesUpdateReadyStatusMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateReadyStatusMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateReadyStatusMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateReadyStatusMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateReadyStatus404Type>,
    { id: FFAccountDeliveriesUpdateReadyStatusPathParamsType['id']; data: FFAccountDeliveriesUpdateReadyStatusMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateReadyStatus(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}