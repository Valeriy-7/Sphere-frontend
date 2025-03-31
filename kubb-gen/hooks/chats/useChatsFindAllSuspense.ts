import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { ChatsFindAllQueryResponseType, ChatsFindAllQueryParamsType } from '../../types/chats/ChatsFindAllType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const chatsFindAllSuspenseQueryKey = (params: ChatsFindAllQueryParamsType) => [{ url: '/chats' }, ...(params ? [params] : [])] as const

export type ChatsFindAllSuspenseQueryKey = ReturnType<typeof chatsFindAllSuspenseQueryKey>

/**
 * @summary Получить список чатов
 * {@link /chats}
 */
export async function chatsFindAllSuspense(params: ChatsFindAllQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ChatsFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/chats`, params, ...requestConfig })
  return res.data
}

export function chatsFindAllSuspenseQueryOptions(params: ChatsFindAllQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = chatsFindAllSuspenseQueryKey(params)
  return queryOptions<ChatsFindAllQueryResponseType, ResponseErrorConfig<Error>, ChatsFindAllQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return chatsFindAllSuspense(params, config)
    },
  })
}

/**
 * @summary Получить список чатов
 * {@link /chats}
 */
export function useChatsFindAllSuspense<
  TData = ChatsFindAllQueryResponseType,
  TQueryData = ChatsFindAllQueryResponseType,
  TQueryKey extends QueryKey = ChatsFindAllSuspenseQueryKey,
>(
  params: ChatsFindAllQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<ChatsFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? chatsFindAllSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(chatsFindAllSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}