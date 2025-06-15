import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType,
  FFAccountDeliveriesUpdateDeliveryQuantitiesMutationResponseType,
  FFAccountDeliveriesUpdateDeliveryQuantitiesPathParamsType,
  FFAccountDeliveriesUpdateDeliveryQuantities404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateDeliveryQuantitiesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateDeliveryQuantitiesMutationKey = () => [{ url: '/ff-account/deliveries/{id}/quantities' }] as const

export type FFAccountDeliveriesUpdateDeliveryQuantitiesMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateDeliveryQuantitiesMutationKey>

/**
 * @description Обновляет фактическое количество и количество брака для всей поставки. Каждый новый POST запрос обновляет количества.
 * @summary (Подготовка) Обновить количества для поставки
 * {@link /ff-account/deliveries/:id/quantities}
 */
export async function FFAccountDeliveriesUpdateDeliveryQuantities(
  id: FFAccountDeliveriesUpdateDeliveryQuantitiesPathParamsType['id'],
  data: FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateDeliveryQuantitiesMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateDeliveryQuantities404Type>,
    FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/quantities`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет фактическое количество и количество брака для всей поставки. Каждый новый POST запрос обновляет количества.
 * @summary (Подготовка) Обновить количества для поставки
 * {@link /ff-account/deliveries/:id/quantities}
 */
export function useFFAccountDeliveriesUpdateDeliveryQuantities<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateDeliveryQuantitiesMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateDeliveryQuantities404Type>,
      { id: FFAccountDeliveriesUpdateDeliveryQuantitiesPathParamsType['id']; data: FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateDeliveryQuantitiesMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateDeliveryQuantitiesMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateDeliveryQuantities404Type>,
    { id: FFAccountDeliveriesUpdateDeliveryQuantitiesPathParamsType['id']; data: FFAccountDeliveriesUpdateDeliveryQuantitiesMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateDeliveryQuantities(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}