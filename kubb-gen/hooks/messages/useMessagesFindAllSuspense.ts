import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  MessagesFindAllQueryResponseType,
  MessagesFindAllQueryParamsType,
} from '../../types/messages/MessagesFindAllType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const messagesFindAllSuspenseQueryKey = (params: MessagesFindAllQueryParamsType) =>
  [{ url: `/messages/${params.chatId}` }, ...(params ? [params] : [])] as const;

export type MessagesFindAllSuspenseQueryKey = ReturnType<typeof messagesFindAllSuspenseQueryKey>;

/**
 * @summary Получить список сообщений в чате
 * {@link /messages}
 */
export async function messagesFindAllSuspense(
  params: MessagesFindAllQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;
  const { chatId, ...queryParams } = params;

  const res = await request<MessagesFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/messages/${chatId}`,
    params: queryParams,
    ...requestConfig,
  });
  return res.data;
}

export function messagesFindAllSuspenseQueryOptions(
  params: MessagesFindAllQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindAllSuspenseQueryKey(params);
  return queryOptions<
    MessagesFindAllQueryResponseType,
    ResponseErrorConfig<Error>,
    MessagesFindAllQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return messagesFindAllSuspense(params, config);
    },
  });
}

/**
 * @summary Получить список сообщений в чате
 * {@link /messages}
 */
export function useMessagesFindAllSuspense<
  TData = MessagesFindAllQueryResponseType,
  TQueryData = MessagesFindAllQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAllSuspenseQueryKey,
>(
  params: MessagesFindAllQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        MessagesFindAllQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? messagesFindAllSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(messagesFindAllSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
