import { axiosInstance } from '@/modules/auth/axios-client';
import type {
  MessagesCreateMutationRequestType,
  MessagesCreate201Type,
} from '../../types/messages/MessagesCreateType';
import type { AxiosRequestConfig } from 'axios';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

export const messagesCreateMutationKey = () => [{ url: '/messages' }] as const;

export type MessagesCreateMutationKey = ReturnType<typeof messagesCreateMutationKey>;

/**
 * @summary Создать новое сообщение
 * {@link /messages}
 */
export const messagesCreate = (
  data: MessagesCreateMutationRequestType,
  options?: AxiosRequestConfig,
) => {
  return axiosInstance.post<MessagesCreate201Type>('/messages', data, options);
};

/**
 * @summary Создать новое сообщение
 * {@link /messages}
 */
export function useMessagesCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      MessagesCreate201Type,
      ResponseErrorConfig<any>,
      { data: MessagesCreateMutationRequestType },
      TContext
    >;
    client?: Partial<RequestConfig<MessagesCreateMutationRequestType>> & {
      client?: typeof axiosInstance;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? messagesCreateMutationKey();

  return useMutation<
    MessagesCreate201Type,
    ResponseErrorConfig<any>,
    { data: MessagesCreateMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return messagesCreate(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
