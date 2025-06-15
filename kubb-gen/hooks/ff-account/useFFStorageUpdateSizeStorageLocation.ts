import client from '@/modules/auth/axios-client'
import type {
  FFStorageUpdateSizeStorageLocationMutationRequestType,
  FFStorageUpdateSizeStorageLocationMutationResponseType,
  FFStorageUpdateSizeStorageLocationPathParamsType,
} from '../../types/ff-account/FFStorageUpdateSizeStorageLocationType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageUpdateSizeStorageLocationMutationKey = () => [{ url: '/ff-account/storage/sizes/{sizeId}/location' }] as const

export type FFStorageUpdateSizeStorageLocationMutationKey = ReturnType<typeof FFStorageUpdateSizeStorageLocationMutationKey>

/**
 * @summary Update size storage location
 * {@link /ff-account/storage/sizes/:sizeId/location}
 */
export async function FFStorageUpdateSizeStorageLocation(
  sizeId: FFStorageUpdateSizeStorageLocationPathParamsType['sizeId'],
  data: FFStorageUpdateSizeStorageLocationMutationRequestType,
  config: Partial<RequestConfig<FFStorageUpdateSizeStorageLocationMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageUpdateSizeStorageLocationMutationResponseType,
    ResponseErrorConfig<Error>,
    FFStorageUpdateSizeStorageLocationMutationRequestType
  >({ method: 'POST', url: `/ff-account/storage/sizes/${sizeId}/location`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Update size storage location
 * {@link /ff-account/storage/sizes/:sizeId/location}
 */
export function useFFStorageUpdateSizeStorageLocation<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageUpdateSizeStorageLocationMutationResponseType,
      ResponseErrorConfig<Error>,
      { sizeId: FFStorageUpdateSizeStorageLocationPathParamsType['sizeId']; data: FFStorageUpdateSizeStorageLocationMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageUpdateSizeStorageLocationMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageUpdateSizeStorageLocationMutationKey()

  return useMutation<
    FFStorageUpdateSizeStorageLocationMutationResponseType,
    ResponseErrorConfig<Error>,
    { sizeId: FFStorageUpdateSizeStorageLocationPathParamsType['sizeId']; data: FFStorageUpdateSizeStorageLocationMutationRequestType },
    TContext
  >({
    mutationFn: async ({ sizeId, data }) => {
      return FFStorageUpdateSizeStorageLocation(sizeId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}