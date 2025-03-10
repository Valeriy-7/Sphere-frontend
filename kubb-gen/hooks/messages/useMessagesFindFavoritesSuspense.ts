import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  MessagesFindFavoritesQueryResponseType,
  MessagesFindFavoritesQueryParamsType,
} from '../../types/messages/MessagesFindFavoritesType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const messagesFindFavoritesSuspenseQueryKey = (
  params: MessagesFindFavoritesQueryParamsType,
) => [{ url: '/messages/favorites' }, ...(params ? [params] : [])] as const;

export type MessagesFindFavoritesSuspenseQueryKey = ReturnType<
  typeof messagesFindFavoritesSuspenseQueryKey
>;

/**
 * @summary Получить список избранных сообщений
 * {@link /messages/favorites}
 */
export async function messagesFindFavoritesSuspense(
  params: MessagesFindFavoritesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    MessagesFindFavoritesQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/messages/favorites`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function messagesFindFavoritesSuspenseQueryOptions(
  params: MessagesFindFavoritesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindFavoritesSuspenseQueryKey(params);
  return queryOptions<
    MessagesFindFavoritesQueryResponseType,
    ResponseErrorConfig<Error>,
    MessagesFindFavoritesQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return messagesFindFavoritesSuspense(params, config);
    },
  });
}

/**
 * @summary Получить список избранных сообщений
 * {@link /messages/favorites}
 */
export function useMessagesFindFavoritesSuspense<
  TData = MessagesFindFavoritesQueryResponseType,
  TQueryData = MessagesFindFavoritesQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindFavoritesSuspenseQueryKey,
>(
  params: MessagesFindFavoritesQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        MessagesFindFavoritesQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? messagesFindFavoritesSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(messagesFindFavoritesSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
