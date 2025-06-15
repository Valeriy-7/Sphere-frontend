import client from '@/modules/auth/axios-client'
import type {
  FFStorageUpdateDeliveryProductSizeMutationRequestType,
  FFStorageUpdateDeliveryProductSizeMutationResponseType,
  FFStorageUpdateDeliveryProductSizePathParamsType,
  FFStorageUpdateDeliveryProductSize404Type,
} from '../../types/ff-account/FFStorageUpdateDeliveryProductSizeType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageUpdateDeliveryProductSizeMutationKey = () => [{ url: '/ff-account/storage/delivery-sizes/{productId}/{sizeIndex}' }] as const

export type FFStorageUpdateDeliveryProductSizeMutationKey = ReturnType<typeof FFStorageUpdateDeliveryProductSizeMutationKey>

/**
 * @description Update storage location, quantities, and defects for a delivery product size with temporary ID (like size-0, size-1)
 * @summary Update delivery product size data
 * {@link /ff-account/storage/delivery-sizes/:productId/:sizeIndex}
 */
export async function FFStorageUpdateDeliveryProductSize(
  productId: FFStorageUpdateDeliveryProductSizePathParamsType['productId'],
  sizeIndex: FFStorageUpdateDeliveryProductSizePathParamsType['sizeIndex'],
  data?: FFStorageUpdateDeliveryProductSizeMutationRequestType,
  config: Partial<RequestConfig<FFStorageUpdateDeliveryProductSizeMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageUpdateDeliveryProductSizeMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateDeliveryProductSize404Type>,
    FFStorageUpdateDeliveryProductSizeMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/storage/delivery-sizes/${productId}/${sizeIndex}`, data, ...requestConfig })
  return res.data
}

/**
 * @description Update storage location, quantities, and defects for a delivery product size with temporary ID (like size-0, size-1)
 * @summary Update delivery product size data
 * {@link /ff-account/storage/delivery-sizes/:productId/:sizeIndex}
 */
export function useFFStorageUpdateDeliveryProductSize<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageUpdateDeliveryProductSizeMutationResponseType,
      ResponseErrorConfig<FFStorageUpdateDeliveryProductSize404Type>,
      {
        productId: FFStorageUpdateDeliveryProductSizePathParamsType['productId']
        sizeIndex: FFStorageUpdateDeliveryProductSizePathParamsType['sizeIndex']
        data?: FFStorageUpdateDeliveryProductSizeMutationRequestType
      },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageUpdateDeliveryProductSizeMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageUpdateDeliveryProductSizeMutationKey()

  return useMutation<
    FFStorageUpdateDeliveryProductSizeMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateDeliveryProductSize404Type>,
    {
      productId: FFStorageUpdateDeliveryProductSizePathParamsType['productId']
      sizeIndex: FFStorageUpdateDeliveryProductSizePathParamsType['sizeIndex']
      data?: FFStorageUpdateDeliveryProductSizeMutationRequestType
    },
    TContext
  >({
    mutationFn: async ({ productId, sizeIndex, data }) => {
      return FFStorageUpdateDeliveryProductSize(productId, sizeIndex, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}