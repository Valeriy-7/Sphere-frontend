import client from '@/modules/auth/axios-client'
import type {
  FFStorageBatchUpdateSizesMutationRequestType,
  FFStorageBatchUpdateSizesMutationResponseType,
} from '../../types/ff-account/FFStorageBatchUpdateSizesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageBatchUpdateSizesMutationKey = () => [{ url: '/ff-account/storage/sizes/batch' }] as const

export type FFStorageBatchUpdateSizesMutationKey = ReturnType<typeof FFStorageBatchUpdateSizesMutationKey>

/**
 * @description Update multiple product sizes in a single operation
 * @summary Batch update multiple sizes
 * {@link /ff-account/storage/sizes/batch}
 */
export async function FFStorageBatchUpdateSizes(
  data: FFStorageBatchUpdateSizesMutationRequestType,
  config: Partial<RequestConfig<FFStorageBatchUpdateSizesMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFStorageBatchUpdateSizesMutationResponseType, ResponseErrorConfig<Error>, FFStorageBatchUpdateSizesMutationRequestType>({
    method: 'PATCH',
    url: `/ff-account/storage/sizes/batch`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Update multiple product sizes in a single operation
 * @summary Batch update multiple sizes
 * {@link /ff-account/storage/sizes/batch}
 */
export function useFFStorageBatchUpdateSizes<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageBatchUpdateSizesMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: FFStorageBatchUpdateSizesMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageBatchUpdateSizesMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageBatchUpdateSizesMutationKey()

  return useMutation<
    FFStorageBatchUpdateSizesMutationResponseType,
    ResponseErrorConfig<Error>,
    { data: FFStorageBatchUpdateSizesMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return FFStorageBatchUpdateSizes(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}