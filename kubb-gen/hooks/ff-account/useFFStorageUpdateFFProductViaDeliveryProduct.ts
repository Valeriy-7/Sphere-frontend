import client from '@/modules/auth/axios-client'
import type {
  FFStorageUpdateFFProductViaDeliveryProductMutationRequestType,
  FFStorageUpdateFFProductViaDeliveryProductMutationResponseType,
  FFStorageUpdateFFProductViaDeliveryProductPathParamsType,
  FFStorageUpdateFFProductViaDeliveryProduct404Type,
} from '../../types/ff-account/FFStorageUpdateFFProductViaDeliveryProductType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageUpdateFFProductViaDeliveryProductMutationKey = () =>
  [{ url: '/ff-account/storage/delivery-products/{deliveryProductId}/quantities' }] as const

export type FFStorageUpdateFFProductViaDeliveryProductMutationKey = ReturnType<typeof FFStorageUpdateFFProductViaDeliveryProductMutationKey>

/**
 * @description Update FF product quantities by mapping from delivery product ID to corresponding FF product
 * @summary Update FF product quantities via delivery product mapping
 * {@link /ff-account/storage/delivery-products/:deliveryProductId/quantities}
 */
export async function FFStorageUpdateFFProductViaDeliveryProduct(
  deliveryProductId: FFStorageUpdateFFProductViaDeliveryProductPathParamsType['deliveryProductId'],
  data?: FFStorageUpdateFFProductViaDeliveryProductMutationRequestType,
  config: Partial<RequestConfig<FFStorageUpdateFFProductViaDeliveryProductMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageUpdateFFProductViaDeliveryProductMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateFFProductViaDeliveryProduct404Type>,
    FFStorageUpdateFFProductViaDeliveryProductMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/storage/delivery-products/${deliveryProductId}/quantities`, data, ...requestConfig })
  return res.data
}

/**
 * @description Update FF product quantities by mapping from delivery product ID to corresponding FF product
 * @summary Update FF product quantities via delivery product mapping
 * {@link /ff-account/storage/delivery-products/:deliveryProductId/quantities}
 */
export function useFFStorageUpdateFFProductViaDeliveryProduct<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageUpdateFFProductViaDeliveryProductMutationResponseType,
      ResponseErrorConfig<FFStorageUpdateFFProductViaDeliveryProduct404Type>,
      {
        deliveryProductId: FFStorageUpdateFFProductViaDeliveryProductPathParamsType['deliveryProductId']
        data?: FFStorageUpdateFFProductViaDeliveryProductMutationRequestType
      },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageUpdateFFProductViaDeliveryProductMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageUpdateFFProductViaDeliveryProductMutationKey()

  return useMutation<
    FFStorageUpdateFFProductViaDeliveryProductMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateFFProductViaDeliveryProduct404Type>,
    {
      deliveryProductId: FFStorageUpdateFFProductViaDeliveryProductPathParamsType['deliveryProductId']
      data?: FFStorageUpdateFFProductViaDeliveryProductMutationRequestType
    },
    TContext
  >({
    mutationFn: async ({ deliveryProductId, data }) => {
      return FFStorageUpdateFFProductViaDeliveryProduct(deliveryProductId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}