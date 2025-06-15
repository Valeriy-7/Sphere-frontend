import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType,
  FFAccountDeliveriesUpdateProductSizeQuantitiesMutationResponseType,
  FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType,
  FFAccountDeliveriesUpdateProductSizeQuantities400Type,
  FFAccountDeliveriesUpdateProductSizeQuantities404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateProductSizeQuantitiesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateProductSizeQuantitiesMutationKey = () =>
  [{ url: '/ff-account/deliveries/{deliveryId}/products/{productId}/size-quantities' }] as const

export type FFAccountDeliveriesUpdateProductSizeQuantitiesMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateProductSizeQuantitiesMutationKey>

/**
 * @description Обновляет фактическое количество и количество брака для каждого размера продукта отдельно.
 * @summary (Подготовка/В работе) Обновить кол-во Факт/Брак по размерам
 * {@link /ff-account/deliveries/:deliveryId/products/:productId/size-quantities}
 */
export async function FFAccountDeliveriesUpdateProductSizeQuantities(
  deliveryId: FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType['deliveryId'],
  productId: FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType['productId'],
  data: FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateProductSizeQuantitiesMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateProductSizeQuantities400Type | FFAccountDeliveriesUpdateProductSizeQuantities404Type>,
    FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${deliveryId}/products/${productId}/size-quantities`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет фактическое количество и количество брака для каждого размера продукта отдельно.
 * @summary (Подготовка/В работе) Обновить кол-во Факт/Брак по размерам
 * {@link /ff-account/deliveries/:deliveryId/products/:productId/size-quantities}
 */
export function useFFAccountDeliveriesUpdateProductSizeQuantities<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateProductSizeQuantitiesMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateProductSizeQuantities400Type | FFAccountDeliveriesUpdateProductSizeQuantities404Type>,
      {
        deliveryId: FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType['deliveryId']
        productId: FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType['productId']
        data: FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType
      },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateProductSizeQuantitiesMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateProductSizeQuantitiesMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateProductSizeQuantities400Type | FFAccountDeliveriesUpdateProductSizeQuantities404Type>,
    {
      deliveryId: FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType['deliveryId']
      productId: FFAccountDeliveriesUpdateProductSizeQuantitiesPathParamsType['productId']
      data: FFAccountDeliveriesUpdateProductSizeQuantitiesMutationRequestType
    },
    TContext
  >({
    mutationFn: async ({ deliveryId, productId, data }) => {
      return FFAccountDeliveriesUpdateProductSizeQuantities(deliveryId, productId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}