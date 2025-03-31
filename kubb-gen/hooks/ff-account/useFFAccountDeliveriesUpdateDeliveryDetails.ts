import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType,
  FFAccountDeliveriesUpdateDeliveryDetailsMutationResponseType,
  FFAccountDeliveriesUpdateDeliveryDetailsPathParamsType,
  FFAccountDeliveriesUpdateDeliveryDetails404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateDeliveryDetailsType'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateDeliveryDetailsMutationKey = () => [{ url: '/ff-account/deliveries/{id}/details' }] as const

export type FFAccountDeliveriesUpdateDeliveryDetailsMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateDeliveryDetailsMutationKey>

/**
 * @description Обновляет детали поставки: назначает ответственного, логиста и меняет статус на "В работе". Если поставка в статусе "Создано", автоматически переводит её в статус "В работе".
 * @summary Обновить детали поставки
 * {@link /ff-account/deliveries/:id/details}
 */
export async function FFAccountDeliveriesUpdateDeliveryDetails(
  id: FFAccountDeliveriesUpdateDeliveryDetailsPathParamsType['id'],
  data?: FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateDeliveryDetailsMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateDeliveryDetails404Type>,
    FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/details`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет детали поставки: назначает ответственного, логиста и меняет статус на "В работе". Если поставка в статусе "Создано", автоматически переводит её в статус "В работе".
 * @summary Обновить детали поставки
 * {@link /ff-account/deliveries/:id/details}
 */
export function useFFAccountDeliveriesUpdateDeliveryDetails<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateDeliveryDetailsMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateDeliveryDetails404Type>,
      { id: FFAccountDeliveriesUpdateDeliveryDetailsPathParamsType['id']; data?: FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateDeliveryDetailsMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateDeliveryDetailsMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateDeliveryDetails404Type>,
    { id: FFAccountDeliveriesUpdateDeliveryDetailsPathParamsType['id']; data?: FFAccountDeliveriesUpdateDeliveryDetailsMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateDeliveryDetails(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}