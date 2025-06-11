import client from '@/modules/auth/axios-client'
import type { ChatsCreateMutationRequestType, ChatsCreateMutationResponseType } from '../../types/chats/ChatsCreateType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const chatsCreateMutationKey = () => [{ url: '/chats/create' }] as const

export type ChatsCreateMutationKey = ReturnType<typeof chatsCreateMutationKey>

/**
 * @summary Создать новый чат с партнером
 * {@link /chats/create}
 */
export async function chatsCreate(
  data: ChatsCreateMutationRequestType,
  config: Partial<RequestConfig<ChatsCreateMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ChatsCreateMutationResponseType, ResponseErrorConfig<Error>, ChatsCreateMutationRequestType>({
    method: 'POST',
    url: `/chats/create`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Создать новый чат с партнером
 * {@link /chats/create}
 */
export function useChatsCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<ChatsCreateMutationResponseType, ResponseErrorConfig<Error>, { data: ChatsCreateMutationRequestType }, TContext>
    client?: Partial<RequestConfig<ChatsCreateMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? chatsCreateMutationKey()

  return useMutation<ChatsCreateMutationResponseType, ResponseErrorConfig<Error>, { data: ChatsCreateMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return chatsCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}