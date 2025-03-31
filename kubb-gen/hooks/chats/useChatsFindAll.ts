import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { ChatsFindAllQueryResponseType, ChatsFindAllQueryParamsType } from '../../types/chats/ChatsFindAllType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const chatsFindAllQueryKey = (params: ChatsFindAllQueryParamsType) => [{ url: '/chats' }, ...(params ? [params] : [])] as const

export type ChatsFindAllQueryKey = ReturnType<typeof chatsFindAllQueryKey>

/**
 * @summary Получить список чатов
 * {@link /chats}
 */
export async function chatsFindAll(params: ChatsFindAllQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ChatsFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/chats`, params, ...requestConfig })
  return res.data
}

export function chatsFindAllQueryOptions(params: ChatsFindAllQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = chatsFindAllQueryKey(params)
  return queryOptions<ChatsFindAllQueryResponseType, ResponseErrorConfig<Error>, ChatsFindAllQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return chatsFindAll(params, config)
    },
  })
}

/**
 * @summary Получить список чатов
 * {@link /chats}
 */
export function useChatsFindAll<
  TData = ChatsFindAllQueryResponseType,
  TQueryData = ChatsFindAllQueryResponseType,
  TQueryKey extends QueryKey = ChatsFindAllQueryKey,
>(
  params: ChatsFindAllQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<ChatsFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? chatsFindAllQueryKey(params)

  const query = useQuery({
    ...(chatsFindAllQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}