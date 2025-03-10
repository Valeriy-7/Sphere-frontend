import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  ChatsFindOneQueryResponseType,
  ChatsFindOnePathParamsType,
} from '../../types/chats/ChatsFindOneType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const chatsFindOneQueryKey = (id: ChatsFindOnePathParamsType['id']) =>
  [{ url: '/chats/:id', params: { id: id } }] as const;

export type ChatsFindOneQueryKey = ReturnType<typeof chatsFindOneQueryKey>;

/**
 * @summary Получить информацию о чате
 * {@link /chats/:id}
 */
export async function chatsFindOne(
  id: ChatsFindOnePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<ChatsFindOneQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/chats/${id}`,
    ...requestConfig,
  });
  return res.data;
}

export function chatsFindOneQueryOptions(
  id: ChatsFindOnePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = chatsFindOneQueryKey(id);
  return queryOptions<
    ChatsFindOneQueryResponseType,
    ResponseErrorConfig<Error>,
    ChatsFindOneQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return chatsFindOne(id, config);
    },
  });
}

/**
 * @summary Получить информацию о чате
 * {@link /chats/:id}
 */
export function useChatsFindOne<
  TData = ChatsFindOneQueryResponseType,
  TQueryData = ChatsFindOneQueryResponseType,
  TQueryKey extends QueryKey = ChatsFindOneQueryKey,
>(
  id: ChatsFindOnePathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        ChatsFindOneQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? chatsFindOneQueryKey(id);

  const query = useQuery({
    ...(chatsFindOneQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
