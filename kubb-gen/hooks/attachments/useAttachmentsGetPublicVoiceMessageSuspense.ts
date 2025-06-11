import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetPublicVoiceMessageQueryResponseType,
  AttachmentsGetPublicVoiceMessagePathParamsType,
  AttachmentsGetPublicVoiceMessage404Type,
} from '../../types/attachments/AttachmentsGetPublicVoiceMessageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const attachmentsGetPublicVoiceMessageSuspenseQueryKey = (id: AttachmentsGetPublicVoiceMessagePathParamsType['id']) =>
  [{ url: '/attachments/public/voice/:id.mp3', params: { id: id } }] as const

export type AttachmentsGetPublicVoiceMessageSuspenseQueryKey = ReturnType<typeof attachmentsGetPublicVoiceMessageSuspenseQueryKey>

/**
 * @summary Публичный доступ к голосовому сообщению по ID
 * {@link /attachments/public/voice/:id.mp3}
 */
export async function attachmentsGetPublicVoiceMessageSuspense(
  id: AttachmentsGetPublicVoiceMessagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetPublicVoiceMessageQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicVoiceMessage404Type>, unknown>({
    method: 'GET',
    url: `/attachments/public/voice/${id}.mp3`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetPublicVoiceMessageSuspenseQueryOptions(
  id: AttachmentsGetPublicVoiceMessagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetPublicVoiceMessageSuspenseQueryKey(id)
  return queryOptions<
    AttachmentsGetPublicVoiceMessageQueryResponseType,
    ResponseErrorConfig<AttachmentsGetPublicVoiceMessage404Type>,
    AttachmentsGetPublicVoiceMessageQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return attachmentsGetPublicVoiceMessageSuspense(id, config)
    },
  })
}

/**
 * @summary Публичный доступ к голосовому сообщению по ID
 * {@link /attachments/public/voice/:id.mp3}
 */
export function useAttachmentsGetPublicVoiceMessageSuspense<
  TData = AttachmentsGetPublicVoiceMessageQueryResponseType,
  TQueryData = AttachmentsGetPublicVoiceMessageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetPublicVoiceMessageSuspenseQueryKey,
>(
  id: AttachmentsGetPublicVoiceMessagePathParamsType['id'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<AttachmentsGetPublicVoiceMessageQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicVoiceMessage404Type>, TData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetPublicVoiceMessageSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(attachmentsGetPublicVoiceMessageSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<AttachmentsGetPublicVoiceMessage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}