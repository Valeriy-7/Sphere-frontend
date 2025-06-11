import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType,
  FFAccountDeliveriesUpdateProductStorageLocationMutationResponseType,
  FFAccountDeliveriesUpdateProductStorageLocationPathParamsType,
  FFAccountDeliveriesUpdateProductStorageLocation404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateProductStorageLocationType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateProductStorageLocationMutationKey = () =>
  [{ url: '/ff-account/deliveries/{deliveryId}/products/{productId}/location' }] as const

export type FFAccountDeliveriesUpdateProductStorageLocationMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateProductStorageLocationMutationKey>

/**
 * @description Обновляет место хранения для конкретного продукта в поставке (используется на этапе "Новые").
 * @summary (Подготовка) Обновить место хранения для продукта
 * {@link /ff-account/deliveries/:deliveryId/products/:productId/location}
 */
export async function FFAccountDeliveriesUpdateProductStorageLocation(
  deliveryId: FFAccountDeliveriesUpdateProductStorageLocationPathParamsType['deliveryId'],
  productId: FFAccountDeliveriesUpdateProductStorageLocationPathParamsType['productId'],
  data: FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateProductStorageLocationMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateProductStorageLocation404Type>,
    FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${deliveryId}/products/${productId}/location`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет место хранения для конкретного продукта в поставке (используется на этапе "Новые").
 * @summary (Подготовка) Обновить место хранения для продукта
 * {@link /ff-account/deliveries/:deliveryId/products/:productId/location}
 */
export function useFFAccountDeliveriesUpdateProductStorageLocation<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateProductStorageLocationMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateProductStorageLocation404Type>,
      {
        deliveryId: FFAccountDeliveriesUpdateProductStorageLocationPathParamsType['deliveryId']
        productId: FFAccountDeliveriesUpdateProductStorageLocationPathParamsType['productId']
        data: FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType
      },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateProductStorageLocationMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateProductStorageLocationMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateProductStorageLocation404Type>,
    {
      deliveryId: FFAccountDeliveriesUpdateProductStorageLocationPathParamsType['deliveryId']
      productId: FFAccountDeliveriesUpdateProductStorageLocationPathParamsType['productId']
      data: FFAccountDeliveriesUpdateProductStorageLocationMutationRequestType
    },
    TContext
  >({
    mutationFn: async ({ deliveryId, productId, data }) => {
      return FFAccountDeliveriesUpdateProductStorageLocation(deliveryId, productId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}