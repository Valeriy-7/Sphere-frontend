import client from '@/modules/auth/axios-client'
import type {
  FFStorageProcessPreparationEventMutationRequestType,
  FFStorageProcessPreparationEventMutationResponseType,
  FFStorageProcessPreparationEvent404Type,
} from '../../types/ff-account/FFStorageProcessPreparationEventType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFStorageProcessPreparationEventMutationKey = () => [{ url: '/ff-account/storage/preparation-event' }] as const

export type FFStorageProcessPreparationEventMutationKey = ReturnType<typeof FFStorageProcessPreparationEventMutationKey>

/**
 * @description Update storage data when preparation event occurs - populates level 3 data
 * @summary Process preparation event
 * {@link /ff-account/storage/preparation-event}
 */
export async function FFStorageProcessPreparationEvent(
  data: FFStorageProcessPreparationEventMutationRequestType,
  config: Partial<RequestConfig<FFStorageProcessPreparationEventMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageProcessPreparationEventMutationResponseType,
    ResponseErrorConfig<FFStorageProcessPreparationEvent404Type>,
    FFStorageProcessPreparationEventMutationRequestType
  >({ method: 'POST', url: `/ff-account/storage/preparation-event`, data, ...requestConfig })
  return res.data
}

/**
 * @description Update storage data when preparation event occurs - populates level 3 data
 * @summary Process preparation event
 * {@link /ff-account/storage/preparation-event}
 */
export function useFFStorageProcessPreparationEvent<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFStorageProcessPreparationEventMutationResponseType,
      ResponseErrorConfig<FFStorageProcessPreparationEvent404Type>,
      { data: FFStorageProcessPreparationEventMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFStorageProcessPreparationEventMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFStorageProcessPreparationEventMutationKey()

  return useMutation<
    FFStorageProcessPreparationEventMutationResponseType,
    ResponseErrorConfig<FFStorageProcessPreparationEvent404Type>,
    { data: FFStorageProcessPreparationEventMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return FFStorageProcessPreparationEvent(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}