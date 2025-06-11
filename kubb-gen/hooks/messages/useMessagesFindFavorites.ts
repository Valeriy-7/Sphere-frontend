import client from '@/modules/auth/axios-client'
import type { MessagesFindFavoritesQueryResponseType, MessagesFindFavoritesQueryParamsType } from '../../types/messages/MessagesFindFavoritesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const messagesFindFavoritesQueryKey = (params: MessagesFindFavoritesQueryParamsType) =>
  [{ url: '/messages/favorites' }, ...(params ? [params] : [])] as const

export type MessagesFindFavoritesQueryKey = ReturnType<typeof messagesFindFavoritesQueryKey>

/**
 * @summary Получить список избранных сообщений
 * {@link /messages/favorites}
 */
export async function messagesFindFavorites(params: MessagesFindFavoritesQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesFindFavoritesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages/favorites`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function messagesFindFavoritesQueryOptions(
  params: MessagesFindFavoritesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindFavoritesQueryKey(params)
  return queryOptions<MessagesFindFavoritesQueryResponseType, ResponseErrorConfig<Error>, MessagesFindFavoritesQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindFavorites(params, config)
    },
  })
}

/**
 * @summary Получить список избранных сообщений
 * {@link /messages/favorites}
 */
export function useMessagesFindFavorites<
  TData = MessagesFindFavoritesQueryResponseType,
  TQueryData = MessagesFindFavoritesQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindFavoritesQueryKey,
>(
  params: MessagesFindFavoritesQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<MessagesFindFavoritesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindFavoritesQueryKey(params)

  const query = useQuery({
    ...(messagesFindFavoritesQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}