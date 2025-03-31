import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { ChatsFindOneQueryResponseType, ChatsFindOnePathParamsType } from '../../types/chats/ChatsFindOneType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const chatsFindOneSuspenseQueryKey = (id: ChatsFindOnePathParamsType['id']) => [{ url: '/chats/:id', params: { id: id } }] as const

export type ChatsFindOneSuspenseQueryKey = ReturnType<typeof chatsFindOneSuspenseQueryKey>

/**
 * @summary Получить информацию о чате
 * {@link /chats/:id}
 */
export async function chatsFindOneSuspense(id: ChatsFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ChatsFindOneQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/chats/${id}`, ...requestConfig })
  return res.data
}

export function chatsFindOneSuspenseQueryOptions(id: ChatsFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = chatsFindOneSuspenseQueryKey(id)
  return queryOptions<ChatsFindOneQueryResponseType, ResponseErrorConfig<Error>, ChatsFindOneQueryResponseType, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return chatsFindOneSuspense(id, config)
    },
  })
}

/**
 * @summary Получить информацию о чате
 * {@link /chats/:id}
 */
export function useChatsFindOneSuspense<
  TData = ChatsFindOneQueryResponseType,
  TQueryData = ChatsFindOneQueryResponseType,
  TQueryKey extends QueryKey = ChatsFindOneSuspenseQueryKey,
>(
  id: ChatsFindOnePathParamsType['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<ChatsFindOneQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? chatsFindOneSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(chatsFindOneSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}