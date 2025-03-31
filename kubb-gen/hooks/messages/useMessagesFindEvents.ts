import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { MessagesFindEventsQueryResponseType, MessagesFindEventsQueryParamsType } from '../../types/messages/MessagesFindEventsType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const messagesFindEventsQueryKey = (params: MessagesFindEventsQueryParamsType) => [{ url: '/messages/events' }, ...(params ? [params] : [])] as const

export type MessagesFindEventsQueryKey = ReturnType<typeof messagesFindEventsQueryKey>

/**
 * @summary Получить список событий в чате
 * {@link /messages/events}
 */
export async function messagesFindEvents(params: MessagesFindEventsQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages/events`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function messagesFindEventsQueryOptions(params: MessagesFindEventsQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = messagesFindEventsQueryKey(params)
  return queryOptions<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, MessagesFindEventsQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindEvents(params, config)
    },
  })
}

/**
 * @summary Получить список событий в чате
 * {@link /messages/events}
 */
export function useMessagesFindEvents<
  TData = MessagesFindEventsQueryResponseType,
  TQueryData = MessagesFindEventsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindEventsQueryKey,
>(
  params: MessagesFindEventsQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<MessagesFindEventsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindEventsQueryKey(params)

  const query = useQuery({
    ...(messagesFindEventsQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}