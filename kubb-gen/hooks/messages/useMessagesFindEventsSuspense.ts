import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  MessagesFindEventsQueryResponseType,
  MessagesFindEventsQueryParamsType,
} from '../../types/messages/MessagesFindEventsType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const messagesFindEventsSuspenseQueryKey = (params: MessagesFindEventsQueryParamsType) =>
  [{ url: `/messages/events/${params.chatId}` }, ...(params ? [params] : [])] as const;

export type MessagesFindEventsSuspenseQueryKey = ReturnType<
  typeof messagesFindEventsSuspenseQueryKey
>;

/**
 * @summary Получить список событий в чате
 * {@link /messages/events}
 */
export async function messagesFindEventsSuspense(
  params: MessagesFindEventsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;
  const { chatId, ...queryParams } = params;

  const res = await request<
    MessagesFindEventsQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/messages/events/${chatId}`,
    params: queryParams,
    ...requestConfig,
  });
  return res.data;
}

export function messagesFindEventsSuspenseQueryOptions(
  params: MessagesFindEventsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindEventsSuspenseQueryKey(params);
  return queryOptions<
    MessagesFindEventsQueryResponseType,
    ResponseErrorConfig<Error>,
    MessagesFindEventsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return messagesFindEventsSuspense(params, config);
    },
  });
}

/**
 * @summary Получить список событий в чате
 * {@link /messages/events}
 */
export function useMessagesFindEventsSuspense<
  TData = MessagesFindEventsQueryResponseType,
  TQueryData = MessagesFindEventsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindEventsSuspenseQueryKey,
>(
  params: MessagesFindEventsQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        MessagesFindEventsQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? messagesFindEventsSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(messagesFindEventsSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
