import client from '@/modules/auth/axios-client'
import type {
  MessagesFindAttachmentsQueryResponseType,
  MessagesFindAttachmentsPathParamsType,
  MessagesFindAttachmentsQueryParamsType,
} from '../../types/messages/MessagesFindAttachmentsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const messagesFindAttachmentsQueryKey = (chatId: MessagesFindAttachmentsPathParamsType['chatId'], params: MessagesFindAttachmentsQueryParamsType) =>
  [{ url: '/messages/attachments/:chatId', params: { chatId: chatId } }, ...(params ? [params] : [])] as const

export type MessagesFindAttachmentsQueryKey = ReturnType<typeof messagesFindAttachmentsQueryKey>

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments/:chatId}
 */
export async function messagesFindAttachments(
  chatId: MessagesFindAttachmentsPathParamsType['chatId'],
  params: MessagesFindAttachmentsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesFindAttachmentsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages/attachments/${chatId}`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function messagesFindAttachmentsQueryOptions(
  chatId: MessagesFindAttachmentsPathParamsType['chatId'],
  params: MessagesFindAttachmentsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindAttachmentsQueryKey(chatId, params)
  return queryOptions<MessagesFindAttachmentsQueryResponseType, ResponseErrorConfig<Error>, MessagesFindAttachmentsQueryResponseType, typeof queryKey>({
    enabled: !!(chatId && params),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindAttachments(chatId, params, config)
    },
  })
}

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments/:chatId}
 */
export function useMessagesFindAttachments<
  TData = MessagesFindAttachmentsQueryResponseType,
  TQueryData = MessagesFindAttachmentsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAttachmentsQueryKey,
>(
  chatId: MessagesFindAttachmentsPathParamsType['chatId'],
  params: MessagesFindAttachmentsQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<MessagesFindAttachmentsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindAttachmentsQueryKey(chatId, params)

  const query = useQuery({
    ...(messagesFindAttachmentsQueryOptions(chatId, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}