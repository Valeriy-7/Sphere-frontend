import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { MessagesFindAllQueryResponseType, MessagesFindAllQueryParamsType } from '../../types/messages/MessagesFindAllType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const messagesFindAllQueryKey = (params: MessagesFindAllQueryParamsType) => [{ url: '/messages' }, ...(params ? [params] : [])] as const

export type MessagesFindAllQueryKey = ReturnType<typeof messagesFindAllQueryKey>

/**
 * @summary Получить список сообщений в чате
 * {@link /messages}
 */
export async function messagesFindAll(params: MessagesFindAllQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function messagesFindAllQueryOptions(params: MessagesFindAllQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = messagesFindAllQueryKey(params)
  return queryOptions<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, MessagesFindAllQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return messagesFindAll(params, config)
    },
  })
}

/**
 * @summary Получить список сообщений в чате
 * {@link /messages}
 */
export function useMessagesFindAll<
  TData = MessagesFindAllQueryResponseType,
  TQueryData = MessagesFindAllQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAllQueryKey,
>(
  params: MessagesFindAllQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? messagesFindAllQueryKey(params)

  const query = useQuery({
    ...(messagesFindAllQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}