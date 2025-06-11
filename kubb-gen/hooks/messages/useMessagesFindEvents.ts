import client from '@/modules/auth/axios-client'
import type {
  MessagesFindEventsQueryResponseType,
  MessagesFindEventsPathParamsType,
  MessagesFindEventsQueryParamsType,
} from '../../types/messages/MessagesFindEventsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const messagesFindEventsQueryKey = (chatId: MessagesFindEventsPathParamsType['chatId'], params: MessagesFindEventsQueryParamsType) =>
  [{ url: '/messages/events/:chatId', params: { chatId: chatId } }, ...(params ? [params] : [])] as const

export type MessagesFindEventsQueryKey = ReturnType<typeof messagesFindEventsQueryKey>

/**
 * @summary Получить список событий в чате
 * {@link /messages/events/:chatId}
 */
export async function messagesFindEvents(
  chatId: MessagesFindEventsPathParamsType['chatId'],
  params: MessagesFindEventsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages/events/${chatId}`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function messagesFindEventsQueryOptions(
  chatId: MessagesFindEventsPathParamsType['chatId'],
  params: MessagesFindEventsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindEventsQueryKey(chatId, params)
  return queryOptions<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, MessagesFindEventsQueryResponseType, typeof queryKey>({
    enabled: !!(chatId && params),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindEvents(chatId, params, config)
    },
  })
}

/**
 * @summary Получить список событий в чате
 * {@link /messages/events/:chatId}
 */
export function useMessagesFindEvents<
  TData = MessagesFindEventsQueryResponseType,
  TQueryData = MessagesFindEventsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindEventsQueryKey,
>(
  chatId: MessagesFindEventsPathParamsType['chatId'],
  params: MessagesFindEventsQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindEventsQueryKey(chatId, params)

  const query = useQuery({
    ...(messagesFindEventsQueryOptions(chatId, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}