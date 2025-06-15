import client from '@/modules/auth/axios-client'
import type {
  FFStorageUpdateProductStorageLocationMutationRequestType,
  FFStorageUpdateProductStorageLocationMutationResponseType,
  FFStorageUpdateProductStorageLocationPathParamsType,
  FFStorageUpdateProductStorageLocation404Type,
} from '../../types/ff-account/FFStorageUpdateProductStorageLocationType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageUpdateProductStorageLocationMutationKey = () => [{ url: '/ff-account/storage/products/{productId}/location' }] as const

export type FFStorageUpdateProductStorageLocationMutationKey = ReturnType<typeof FFStorageUpdateProductStorageLocationMutationKey>

/**
 * @description Updates the storage location for a specific product (pencil icon functionality)
 * @summary Update product storage location
 * {@link /ff-account/storage/products/:productId/location}
 */
export async function FFStorageUpdateProductStorageLocation(
  productId: FFStorageUpdateProductStorageLocationPathParamsType['productId'],
  data: FFStorageUpdateProductStorageLocationMutationRequestType,
  config: Partial<RequestConfig<FFStorageUpdateProductStorageLocationMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageUpdateProductStorageLocationMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateProductStorageLocation404Type>,
    FFStorageUpdateProductStorageLocationMutationRequestType
  >({ method: 'POST', url: `/ff-account/storage/products/${productId}/location`, data, ...requestConfig })
  return res.data
}

/**
 * @description Updates the storage location for a specific product (pencil icon functionality)
 * @summary Update product storage location
 * {@link /ff-account/storage/products/:productId/location}
 */
export function useFFStorageUpdateProductStorageLocation<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageUpdateProductStorageLocationMutationResponseType,
      ResponseErrorConfig<FFStorageUpdateProductStorageLocation404Type>,
      { productId: FFStorageUpdateProductStorageLocationPathParamsType['productId']; data: FFStorageUpdateProductStorageLocationMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageUpdateProductStorageLocationMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageUpdateProductStorageLocationMutationKey()

  return useMutation<
    FFStorageUpdateProductStorageLocationMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateProductStorageLocation404Type>,
    { productId: FFStorageUpdateProductStorageLocationPathParamsType['productId']; data: FFStorageUpdateProductStorageLocationMutationRequestType },
    TContext
  >({
    mutationFn: async ({ productId, data }) => {
      return FFStorageUpdateProductStorageLocation(productId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}