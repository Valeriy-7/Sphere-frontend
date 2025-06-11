import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetVoiceMessageQueryResponseType,
  AttachmentsGetVoiceMessagePathParamsType,
  AttachmentsGetVoiceMessage404Type,
} from '../../types/attachments/AttachmentsGetVoiceMessageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const attachmentsGetVoiceMessageQueryKey = (id: AttachmentsGetVoiceMessagePathParamsType['id']) =>
  [{ url: '/attachments/voice/:id', params: { id: id } }] as const

export type AttachmentsGetVoiceMessageQueryKey = ReturnType<typeof attachmentsGetVoiceMessageQueryKey>

/**
 * @summary Получить голосовое сообщение по ID
 * {@link /attachments/voice/:id}
 */
export async function attachmentsGetVoiceMessage(
  id: AttachmentsGetVoiceMessagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetVoiceMessageQueryResponseType, ResponseErrorConfig<AttachmentsGetVoiceMessage404Type>, unknown>({
    method: 'GET',
    url: `/attachments/voice/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetVoiceMessageQueryOptions(
  id: AttachmentsGetVoiceMessagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetVoiceMessageQueryKey(id)
  return queryOptions<
    AttachmentsGetVoiceMessageQueryResponseType,
    ResponseErrorConfig<AttachmentsGetVoiceMessage404Type>,
    AttachmentsGetVoiceMessageQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return attachmentsGetVoiceMessage(id, config)
    },
  })
}

/**
 * @summary Получить голосовое сообщение по ID
 * {@link /attachments/voice/:id}
 */
export function useAttachmentsGetVoiceMessage<
  TData = AttachmentsGetVoiceMessageQueryResponseType,
  TQueryData = AttachmentsGetVoiceMessageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetVoiceMessageQueryKey,
>(
  id: AttachmentsGetVoiceMessagePathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<AttachmentsGetVoiceMessageQueryResponseType, ResponseErrorConfig<AttachmentsGetVoiceMessage404Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetVoiceMessageQueryKey(id)

  const query = useQuery({
    ...(attachmentsGetVoiceMessageQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<AttachmentsGetVoiceMessage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}