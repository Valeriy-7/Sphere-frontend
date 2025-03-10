import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  MessagesFindAttachmentsQueryResponseType,
  MessagesFindAttachmentsQueryParamsType,
} from '../../types/messages/MessagesFindAttachmentsType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const messagesFindAttachmentsSuspenseQueryKey = (
  params: MessagesFindAttachmentsQueryParamsType,
) => [{ url: '/messages/attachments' }, ...(params ? [params] : [])] as const;

export type MessagesFindAttachmentsSuspenseQueryKey = ReturnType<
  typeof messagesFindAttachmentsSuspenseQueryKey
>;

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments}
 */
export async function messagesFindAttachmentsSuspense(
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

export function messagesFindAttachmentsSuspenseQueryOptions(
  params: MessagesFindAttachmentsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = messagesFindAttachmentsSuspenseQueryKey(params);
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
      return messagesFindAttachmentsSuspense(params, config);
    },
  });
}

/**
 * @summary Получить список вложений в чате
 * {@link /messages/attachments}
 */
export function useMessagesFindAttachmentsSuspense<
  TData = MessagesFindAttachmentsQueryResponseType,
  TQueryData = MessagesFindAttachmentsQueryResponseType,
  TQueryKey extends QueryKey = MessagesFindAttachmentsSuspenseQueryKey,
>(
  params: MessagesFindAttachmentsQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        MessagesFindAttachmentsQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? messagesFindAttachmentsSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(messagesFindAttachmentsSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
