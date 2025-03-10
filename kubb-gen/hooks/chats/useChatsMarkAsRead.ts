import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  ChatsMarkAsReadMutationRequestType,
  ChatsMarkAsReadMutationResponseType,
} from '../../types/chats/ChatsMarkAsReadType';
import { useMutation } from '@tanstack/react-query';

export const chatsMarkAsReadMutationKey = () => [{ url: '/chats/mark-as-read' }] as const;

export type ChatsMarkAsReadMutationKey = ReturnType<typeof chatsMarkAsReadMutationKey>;

/**
 * @summary Отметить сообщения в чате как прочитанные
 * {@link /chats/mark-as-read}
 */
export async function chatsMarkAsRead(
  data: ChatsMarkAsReadMutationRequestType,
  config: Partial<RequestConfig<ChatsMarkAsReadMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ChatsMarkAsReadMutationResponseType,
    ResponseErrorConfig<Error>,
    ChatsMarkAsReadMutationRequestType
  >({
    method: 'POST',
    url: `/chats/mark-as-read`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @summary Отметить сообщения в чате как прочитанные
 * {@link /chats/mark-as-read}
 */
export function useChatsMarkAsRead(
  options: {
    mutation?: UseMutationOptions<
      ChatsMarkAsReadMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: ChatsMarkAsReadMutationRequestType }
    >;
    client?: Partial<RequestConfig<ChatsMarkAsReadMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? chatsMarkAsReadMutationKey();

  return useMutation<
    ChatsMarkAsReadMutationResponseType,
    ResponseErrorConfig<Error>,
    { data: ChatsMarkAsReadMutationRequestType }
  >({
    mutationFn: async ({ data }) => {
      return chatsMarkAsRead(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
