import client from '@/modules/auth/axios-client'
import type { MessagesCreateMutationRequestType, MessagesCreateMutationResponseType } from '../../types/messages/MessagesCreateType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const messagesCreateMutationKey = () => [{ url: '/messages' }] as const

export type MessagesCreateMutationKey = ReturnType<typeof messagesCreateMutationKey>

/**
 * @summary Создать новое сообщение
 * {@link /messages}
 */
export async function messagesCreate(
  data: MessagesCreateMutationRequestType,
  config: Partial<RequestConfig<MessagesCreateMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesCreateMutationResponseType, ResponseErrorConfig<Error>, MessagesCreateMutationRequestType>({
    method: 'POST',
    url: `/messages`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Создать новое сообщение
 * {@link /messages}
 */
export function useMessagesCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<MessagesCreateMutationResponseType, ResponseErrorConfig<Error>, { data: MessagesCreateMutationRequestType }, TContext>
    client?: Partial<RequestConfig<MessagesCreateMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? messagesCreateMutationKey()

  return useMutation<MessagesCreateMutationResponseType, ResponseErrorConfig<Error>, { data: MessagesCreateMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return messagesCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}