import client from '@/modules/auth/axios-client'
import type { MessagesFindAllQueryResponseType, MessagesFindAllPathParamsType } from '../../types/messages/MessagesFindAllType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const messagesFindAllSuspenseQueryKey = (chatId: MessagesFindAllPathParamsType['chatId']) =>
  [{ url: '/messages/:chatId', params: { chatId: chatId } }] as const

export type MessagesFindAllSuspenseQueryKey = ReturnType<typeof messagesFindAllSuspenseQueryKey>

/**
 * @summary Получить список сообщений в чате
 * {@link /messages/:chatId}
 */
export async function messagesFindAllSuspense(
  chatId: MessagesFindAllPathParamsType['chatId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages/${chatId}`,
    ...requestConfig,
  })
  return res.data
}

export function messagesFindAllSuspenseQueryOptions(
  chatId: MessagesFindAllPathParamsType['chatId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindAllSuspenseQueryKey(chatId)
  return queryOptions<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, MessagesFindAllQueryResponseType, typeof queryKey>({
    enabled: !!chatId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindAllSuspense(chatId, config)
    },
  })
}

/**
 * @summary Получить список сообщений в чате
 * {@link /messages/:chatId}
 */
export function useMessagesFindAllSuspense<
  TData = MessagesFindAllQueryResponseType,
  TQueryData = MessagesFindAllQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAllSuspenseQueryKey,
>(
  chatId: MessagesFindAllPathParamsType['chatId'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindAllSuspenseQueryKey(chatId)

  const query = useSuspenseQuery({
    ...(messagesFindAllSuspenseQueryOptions(chatId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}