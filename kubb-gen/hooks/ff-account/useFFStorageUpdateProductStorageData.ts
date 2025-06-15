import client from '@/modules/auth/axios-client'
import type {
  FFStorageUpdateProductStorageDataMutationRequestType,
  FFStorageUpdateProductStorageDataMutationResponseType,
  FFStorageUpdateProductStorageDataPathParamsType,
  FFStorageUpdateProductStorageData404Type,
} from '../../types/ff-account/FFStorageUpdateProductStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageUpdateProductStorageDataMutationKey = () => [{ url: '/ff-account/storage/products/{productId}' }] as const

export type FFStorageUpdateProductStorageDataMutationKey = ReturnType<typeof FFStorageUpdateProductStorageDataMutationKey>

/**
 * @description Update product storage location, quantities, and size-level data comprehensively
 * @summary Comprehensive product storage update
 * {@link /ff-account/storage/products/:productId}
 */
export async function FFStorageUpdateProductStorageData(
  productId: FFStorageUpdateProductStorageDataPathParamsType['productId'],
  data?: FFStorageUpdateProductStorageDataMutationRequestType,
  config: Partial<RequestConfig<FFStorageUpdateProductStorageDataMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageUpdateProductStorageDataMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateProductStorageData404Type>,
    FFStorageUpdateProductStorageDataMutationRequestType
  >({ method: 'PUT', url: `/ff-account/storage/products/${productId}`, data, ...requestConfig })
  return res.data
}

/**
 * @description Update product storage location, quantities, and size-level data comprehensively
 * @summary Comprehensive product storage update
 * {@link /ff-account/storage/products/:productId}
 */
export function useFFStorageUpdateProductStorageData<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageUpdateProductStorageDataMutationResponseType,
      ResponseErrorConfig<FFStorageUpdateProductStorageData404Type>,
      { productId: FFStorageUpdateProductStorageDataPathParamsType['productId']; data?: FFStorageUpdateProductStorageDataMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageUpdateProductStorageDataMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageUpdateProductStorageDataMutationKey()

  return useMutation<
    FFStorageUpdateProductStorageDataMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateProductStorageData404Type>,
    { productId: FFStorageUpdateProductStorageDataPathParamsType['productId']; data?: FFStorageUpdateProductStorageDataMutationRequestType },
    TContext
  >({
    mutationFn: async ({ productId, data }) => {
      return FFStorageUpdateProductStorageData(productId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}