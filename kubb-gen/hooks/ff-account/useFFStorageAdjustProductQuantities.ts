import client from '@/modules/auth/axios-client'
import type {
  FFStorageAdjustProductQuantitiesMutationRequestType,
  FFStorageAdjustProductQuantitiesMutationResponseType,
  FFStorageAdjustProductQuantitiesPathParamsType,
  FFStorageAdjustProductQuantities404Type,
} from '../../types/ff-account/FFStorageAdjustProductQuantitiesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageAdjustProductQuantitiesMutationKey = () => [{ url: '/ff-account/storage/products/{productId}/quantities' }] as const

export type FFStorageAdjustProductQuantitiesMutationKey = ReturnType<typeof FFStorageAdjustProductQuantitiesMutationKey>

/**
 * @description Manually adjust fact quantities and defects for a product
 * @summary Manual quantity adjustment for product
 * {@link /ff-account/storage/products/:productId/quantities}
 */
export async function FFStorageAdjustProductQuantities(
  productId: FFStorageAdjustProductQuantitiesPathParamsType['productId'],
  data?: FFStorageAdjustProductQuantitiesMutationRequestType,
  config: Partial<RequestConfig<FFStorageAdjustProductQuantitiesMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageAdjustProductQuantitiesMutationResponseType,
    ResponseErrorConfig<FFStorageAdjustProductQuantities404Type>,
    FFStorageAdjustProductQuantitiesMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/storage/products/${productId}/quantities`, data, ...requestConfig })
  return res.data
}

/**
 * @description Manually adjust fact quantities and defects for a product
 * @summary Manual quantity adjustment for product
 * {@link /ff-account/storage/products/:productId/quantities}
 */
export function useFFStorageAdjustProductQuantities<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageAdjustProductQuantitiesMutationResponseType,
      ResponseErrorConfig<FFStorageAdjustProductQuantities404Type>,
      { productId: FFStorageAdjustProductQuantitiesPathParamsType['productId']; data?: FFStorageAdjustProductQuantitiesMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageAdjustProductQuantitiesMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageAdjustProductQuantitiesMutationKey()

  return useMutation<
    FFStorageAdjustProductQuantitiesMutationResponseType,
    ResponseErrorConfig<FFStorageAdjustProductQuantities404Type>,
    { productId: FFStorageAdjustProductQuantitiesPathParamsType['productId']; data?: FFStorageAdjustProductQuantitiesMutationRequestType },
    TContext
  >({
    mutationFn: async ({ productId, data }) => {
      return FFStorageAdjustProductQuantities(productId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}