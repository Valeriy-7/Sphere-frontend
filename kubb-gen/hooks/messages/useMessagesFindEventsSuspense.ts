import client from '@/modules/auth/axios-client'
import type {
  MessagesFindEventsQueryResponseType,
  MessagesFindEventsPathParamsType,
  MessagesFindEventsQueryParamsType,
} from '../../types/messages/MessagesFindEventsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const messagesFindEventsSuspenseQueryKey = (chatId: MessagesFindEventsPathParamsType['chatId'], params: MessagesFindEventsQueryParamsType) =>
  [{ url: '/messages/events/:chatId', params: { chatId: chatId } }, ...(params ? [params] : [])] as const

export type MessagesFindEventsSuspenseQueryKey = ReturnType<typeof messagesFindEventsSuspenseQueryKey>

/**
 * @summary Получить список событий в чате
 * {@link /messages/events/:chatId}
 */
export async function messagesFindEventsSuspense(
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

export function messagesFindEventsSuspenseQueryOptions(
  chatId: MessagesFindEventsPathParamsType['chatId'],
  params: MessagesFindEventsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindEventsSuspenseQueryKey(chatId, params)
  return queryOptions<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, MessagesFindEventsQueryResponseType, typeof queryKey>({
    enabled: !!(chatId && params),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindEventsSuspense(chatId, params, config)
    },
  })
}

/**
 * @summary Получить список событий в чате
 * {@link /messages/events/:chatId}
 */
export function useMessagesFindEventsSuspense<
  TData = MessagesFindEventsQueryResponseType,
  TQueryData = MessagesFindEventsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindEventsSuspenseQueryKey,
>(
  chatId: MessagesFindEventsPathParamsType['chatId'],
  params: MessagesFindEventsQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindEventsSuspenseQueryKey(chatId, params)

  const query = useSuspenseQuery({
    ...(messagesFindEventsSuspenseQueryOptions(chatId, params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}