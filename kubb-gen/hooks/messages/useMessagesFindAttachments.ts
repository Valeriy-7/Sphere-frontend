import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  MessagesFindAttachmentsQueryResponseType,
  MessagesFindAttachmentsQueryParamsType,
} from '../../types/messages/MessagesFindAttachmentsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const messagesFindAttachmentsQueryKey = (params: MessagesFindAttachmentsQueryParamsType) =>
  [{ url: '/messages/attachments' }, ...(params ? [params] : [])] as const;

export type MessagesFindAttachmentsQueryKey = ReturnType<typeof messagesFindAttachmentsQueryKey>;

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments}
 */
export async function messagesFindAttachments(
  params: MessagesFindAttachmentsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    MessagesFindAttachmentsQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/messages/attachments`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function messagesFindAttachmentsQueryOptions(
  params: MessagesFindAttachmentsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindAttachmentsQueryKey(params);
  return queryOptions<
    MessagesFindAttachmentsQueryResponseType,
    ResponseErrorConfig<Error>,
    MessagesFindAttachmentsQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return messagesFindAttachments(params, config);
    },
  });
}

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments}
 */
export function useMessagesFindAttachments<
  TData = MessagesFindAttachmentsQueryResponseType,
  TQueryData = MessagesFindAttachmentsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAttachmentsQueryKey,
>(
  params: MessagesFindAttachmentsQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        MessagesFindAttachmentsQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? messagesFindAttachmentsQueryKey(params);

  const query = useQuery({
    ...(messagesFindAttachmentsQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
