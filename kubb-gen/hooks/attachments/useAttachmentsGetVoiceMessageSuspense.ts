import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetVoiceMessageQueryResponseType,
  AttachmentsGetVoiceMessagePathParamsType,
  AttachmentsGetVoiceMessage404Type,
} from '../../types/attachments/AttachmentsGetVoiceMessageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const attachmentsGetVoiceMessageSuspenseQueryKey = (id: AttachmentsGetVoiceMessagePathParamsType['id']) =>
  [{ url: '/attachments/voice/:id', params: { id: id } }] as const

export type AttachmentsGetVoiceMessageSuspenseQueryKey = ReturnType<typeof attachmentsGetVoiceMessageSuspenseQueryKey>

/**
 * @summary Получить голосовое сообщение по ID
 * {@link /attachments/voice/:id}
 */
export async function attachmentsGetVoiceMessageSuspense(
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

export function attachmentsGetVoiceMessageSuspenseQueryOptions(
  id: AttachmentsGetVoiceMessagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetVoiceMessageSuspenseQueryKey(id)
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
      return attachmentsGetVoiceMessageSuspense(id, config)
    },
  })
}

/**
 * @summary Получить голосовое сообщение по ID
 * {@link /attachments/voice/:id}
 */
export function useAttachmentsGetVoiceMessageSuspense<
  TData = AttachmentsGetVoiceMessageQueryResponseType,
  TQueryData = AttachmentsGetVoiceMessageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetVoiceMessageSuspenseQueryKey,
>(
  id: AttachmentsGetVoiceMessagePathParamsType['id'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<AttachmentsGetVoiceMessageQueryResponseType, ResponseErrorConfig<AttachmentsGetVoiceMessage404Type>, TData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetVoiceMessageSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(attachmentsGetVoiceMessageSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<AttachmentsGetVoiceMessage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}