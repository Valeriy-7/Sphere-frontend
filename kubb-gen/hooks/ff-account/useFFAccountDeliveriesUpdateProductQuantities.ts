import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType,
  FFAccountDeliveriesUpdateProductQuantitiesMutationResponseType,
  FFAccountDeliveriesUpdateProductQuantitiesPathParamsType,
  FFAccountDeliveriesUpdateProductQuantities400Type,
  FFAccountDeliveriesUpdateProductQuantities404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateProductQuantitiesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateProductQuantitiesMutationKey = () =>
  [{ url: '/ff-account/deliveries/{deliveryId}/products/{productId}/quantities' }] as const

export type FFAccountDeliveriesUpdateProductQuantitiesMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateProductQuantitiesMutationKey>

/**
 * @description Обновляет фактическое количество и количество брака для продукта в поставке на этапе "В работе".
 * @summary (Подготовка/В работе) Обновить кол-во Факт/Брак для продукта
 * {@link /ff-account/deliveries/:deliveryId/products/:productId/quantities}
 */
export async function FFAccountDeliveriesUpdateProductQuantities(
  deliveryId: FFAccountDeliveriesUpdateProductQuantitiesPathParamsType['deliveryId'],
  productId: FFAccountDeliveriesUpdateProductQuantitiesPathParamsType['productId'],
  data: FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateProductQuantitiesMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateProductQuantities400Type | FFAccountDeliveriesUpdateProductQuantities404Type>,
    FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${deliveryId}/products/${productId}/quantities`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет фактическое количество и количество брака для продукта в поставке на этапе "В работе".
 * @summary (Подготовка/В работе) Обновить кол-во Факт/Брак для продукта
 * {@link /ff-account/deliveries/:deliveryId/products/:productId/quantities}
 */
export function useFFAccountDeliveriesUpdateProductQuantities<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateProductQuantitiesMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateProductQuantities400Type | FFAccountDeliveriesUpdateProductQuantities404Type>,
      {
        deliveryId: FFAccountDeliveriesUpdateProductQuantitiesPathParamsType['deliveryId']
        productId: FFAccountDeliveriesUpdateProductQuantitiesPathParamsType['productId']
        data: FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType
      },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateProductQuantitiesMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateProductQuantitiesMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateProductQuantities400Type | FFAccountDeliveriesUpdateProductQuantities404Type>,
    {
      deliveryId: FFAccountDeliveriesUpdateProductQuantitiesPathParamsType['deliveryId']
      productId: FFAccountDeliveriesUpdateProductQuantitiesPathParamsType['productId']
      data: FFAccountDeliveriesUpdateProductQuantitiesMutationRequestType
    },
    TContext
  >({
    mutationFn: async ({ deliveryId, productId, data }) => {
      return FFAccountDeliveriesUpdateProductQuantities(deliveryId, productId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}