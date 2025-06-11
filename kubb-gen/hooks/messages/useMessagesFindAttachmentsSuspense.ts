import client from '@/modules/auth/axios-client'
import type {
  MessagesFindAttachmentsQueryResponseType,
  MessagesFindAttachmentsPathParamsType,
  MessagesFindAttachmentsQueryParamsType,
} from '../../types/messages/MessagesFindAttachmentsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const messagesFindAttachmentsSuspenseQueryKey = (
  chatId: MessagesFindAttachmentsPathParamsType['chatId'],
  params: MessagesFindAttachmentsQueryParamsType,
) => [{ url: '/messages/attachments/:chatId', params: { chatId: chatId } }, ...(params ? [params] : [])] as const

export type MessagesFindAttachmentsSuspenseQueryKey = ReturnType<typeof messagesFindAttachmentsSuspenseQueryKey>

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments/:chatId}
 */
export async function messagesFindAttachmentsSuspense(
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

export function messagesFindAttachmentsSuspenseQueryOptions(
  chatId: MessagesFindAttachmentsPathParamsType['chatId'],
  params: MessagesFindAttachmentsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindAttachmentsSuspenseQueryKey(chatId, params)
  return queryOptions<MessagesFindAttachmentsQueryResponseType, ResponseErrorConfig<Error>, MessagesFindAttachmentsQueryResponseType, typeof queryKey>({
    enabled: !!(chatId && params),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindAttachmentsSuspense(chatId, params, config)
    },
  })
}

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments/:chatId}
 */
export function useMessagesFindAttachmentsSuspense<
  TData = MessagesFindAttachmentsQueryResponseType,
  TQueryData = MessagesFindAttachmentsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAttachmentsSuspenseQueryKey,
>(
  chatId: MessagesFindAttachmentsPathParamsType['chatId'],
  params: MessagesFindAttachmentsQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<MessagesFindAttachmentsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindAttachmentsSuspenseQueryKey(chatId, params)

  const query = useSuspenseQuery({
    ...(messagesFindAttachmentsSuspenseQueryOptions(chatId, params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}