import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetPublicVoiceMessageQueryResponseType,
  AttachmentsGetPublicVoiceMessagePathParamsType,
  AttachmentsGetPublicVoiceMessage404Type,
} from '../../types/attachments/AttachmentsGetPublicVoiceMessageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const attachmentsGetPublicVoiceMessageQueryKey = (id: AttachmentsGetPublicVoiceMessagePathParamsType['id']) =>
  [{ url: '/attachments/public/voice/:id.mp3', params: { id: id } }] as const

export type AttachmentsGetPublicVoiceMessageQueryKey = ReturnType<typeof attachmentsGetPublicVoiceMessageQueryKey>

/**
 * @summary Публичный доступ к голосовому сообщению по ID
 * {@link /attachments/public/voice/:id.mp3}
 */
export async function attachmentsGetPublicVoiceMessage(
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

export function attachmentsGetPublicVoiceMessageQueryOptions(
  id: AttachmentsGetPublicVoiceMessagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetPublicVoiceMessageQueryKey(id)
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
      return attachmentsGetPublicVoiceMessage(id, config)
    },
  })
}

/**
 * @summary Публичный доступ к голосовому сообщению по ID
 * {@link /attachments/public/voice/:id.mp3}
 */
export function useAttachmentsGetPublicVoiceMessage<
  TData = AttachmentsGetPublicVoiceMessageQueryResponseType,
  TQueryData = AttachmentsGetPublicVoiceMessageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetPublicVoiceMessageQueryKey,
>(
  id: AttachmentsGetPublicVoiceMessagePathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        AttachmentsGetPublicVoiceMessageQueryResponseType,
        ResponseErrorConfig<AttachmentsGetPublicVoiceMessage404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetPublicVoiceMessageQueryKey(id)

  const query = useQuery({
    ...(attachmentsGetPublicVoiceMessageQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<AttachmentsGetPublicVoiceMessage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}