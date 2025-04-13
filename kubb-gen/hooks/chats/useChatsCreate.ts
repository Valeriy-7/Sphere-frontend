import { axiosInstance } from '@/modules/auth/axios-client';
import type { AxiosRequestConfig } from 'axios';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

export const chatsCreateMutationKey = () => [{ url: '/chats/create' }] as const;

export type ChatsCreateMutationKey = ReturnType<typeof chatsCreateMutationKey>;

export type ChatsCreateRequestType = {
  partnerId: string;
};

export type ChatsCreateResponseType = {
  id: string;
  cabinetId1: string;
  cabinetId2: string;
};

/**
 * @summary Создать новый чат с партнером
 * {@link /chats/create}
 */
export const chatsCreate = (data: ChatsCreateRequestType, options?: AxiosRequestConfig) => {
  return axiosInstance.post<ChatsCreateResponseType>('/chats/create', data, options);
};

/**
 * @summary Создать новый чат с партнером
 * {@link /chats/create}
 */
export function useChatsCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ChatsCreateResponseType,
      ResponseErrorConfig<any>,
      { data: ChatsCreateRequestType },
      TContext
    >;
    client?: Partial<RequestConfig<ChatsCreateRequestType>> & {
      client?: typeof axiosInstance;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? chatsCreateMutationKey();

  return useMutation<
    ChatsCreateResponseType,
    ResponseErrorConfig<any>,
    { data: ChatsCreateRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      const response = await chatsCreate(data, config);
      return response.data;
    },
    mutationKey,
    ...mutationOptions,
  });
}
