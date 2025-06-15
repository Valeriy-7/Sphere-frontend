import client from '@/modules/auth/axios-client'
import type {
  FFStorageUpdateSizeQuantitiesMutationRequestType,
  FFStorageUpdateSizeQuantitiesMutationResponseType,
  FFStorageUpdateSizeQuantitiesPathParamsType,
  FFStorageUpdateSizeQuantities404Type,
} from '../../types/ff-account/FFStorageUpdateSizeQuantitiesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageUpdateSizeQuantitiesMutationKey = () => [{ url: '/ff-account/storage/sizes/{sizeId}' }] as const

export type FFStorageUpdateSizeQuantitiesMutationKey = ReturnType<typeof FFStorageUpdateSizeQuantitiesMutationKey>

/**
 * @description Update quantities, defects, and storage location for a specific product size
 * @summary Update size-level quantities and location
 * {@link /ff-account/storage/sizes/:sizeId}
 */
export async function FFStorageUpdateSizeQuantities(
  sizeId: FFStorageUpdateSizeQuantitiesPathParamsType['sizeId'],
  data: FFStorageUpdateSizeQuantitiesMutationRequestType,
  config: Partial<RequestConfig<FFStorageUpdateSizeQuantitiesMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageUpdateSizeQuantitiesMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateSizeQuantities404Type>,
    FFStorageUpdateSizeQuantitiesMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/storage/sizes/${sizeId}`, data, ...requestConfig })
  return res.data
}

/**
 * @description Update quantities, defects, and storage location for a specific product size
 * @summary Update size-level quantities and location
 * {@link /ff-account/storage/sizes/:sizeId}
 */
export function useFFStorageUpdateSizeQuantities<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageUpdateSizeQuantitiesMutationResponseType,
      ResponseErrorConfig<FFStorageUpdateSizeQuantities404Type>,
      { sizeId: FFStorageUpdateSizeQuantitiesPathParamsType['sizeId']; data: FFStorageUpdateSizeQuantitiesMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageUpdateSizeQuantitiesMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageUpdateSizeQuantitiesMutationKey()

  return useMutation<
    FFStorageUpdateSizeQuantitiesMutationResponseType,
    ResponseErrorConfig<FFStorageUpdateSizeQuantities404Type>,
    { sizeId: FFStorageUpdateSizeQuantitiesPathParamsType['sizeId']; data: FFStorageUpdateSizeQuantitiesMutationRequestType },
    TContext
  >({
    mutationFn: async ({ sizeId, data }) => {
      return FFStorageUpdateSizeQuantities(sizeId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}