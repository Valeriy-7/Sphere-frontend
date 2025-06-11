import client from '@/modules/auth/axios-client'
import type { MessagesFindAllQueryResponseType, MessagesFindAllPathParamsType } from '../../types/messages/MessagesFindAllType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const messagesFindAllQueryKey = (chatId: MessagesFindAllPathParamsType['chatId']) => [{ url: '/messages/:chatId', params: { chatId: chatId } }] as const

export type MessagesFindAllQueryKey = ReturnType<typeof messagesFindAllQueryKey>

/**
 * @summary Получить список сообщений в чате
 * {@link /messages/:chatId}
 */
export async function messagesFindAll(chatId: MessagesFindAllPathParamsType['chatId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages/${chatId}`,
    ...requestConfig,
  })
  return res.data
}

export function messagesFindAllQueryOptions(chatId: MessagesFindAllPathParamsType['chatId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = messagesFindAllQueryKey(chatId)
  return queryOptions<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, MessagesFindAllQueryResponseType, typeof queryKey>({
    enabled: !!chatId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindAll(chatId, config)
    },
  })
}

/**
 * @summary Получить список сообщений в чате
 * {@link /messages/:chatId}
 */
export function useMessagesFindAll<
  TData = MessagesFindAllQueryResponseType,
  TQueryData = MessagesFindAllQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAllQueryKey,
>(
  chatId: MessagesFindAllPathParamsType['chatId'],
  options: {
    query?: Partial<QueryObserverOptions<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindAllQueryKey(chatId)

  const query = useQuery({
    ...(messagesFindAllQueryOptions(chatId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}