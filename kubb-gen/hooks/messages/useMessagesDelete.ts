import client from '@/modules/auth/axios-client'
import type { MessagesDeleteMutationResponseType, MessagesDeletePathParamsType } from '../../types/messages/MessagesDeleteType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const messagesDeleteMutationKey = () => [{ url: '/messages/{messageId}' }] as const

export type MessagesDeleteMutationKey = ReturnType<typeof messagesDeleteMutationKey>

/**
 * @summary Удалить сообщение
 * {@link /messages/:messageId}
 */
export async function messagesDelete(messageId: MessagesDeletePathParamsType['messageId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesDeleteMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/messages/${messageId}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Удалить сообщение
 * {@link /messages/:messageId}
 */
export function useMessagesDelete<TContext>(
  options: {
    mutation?: UseMutationOptions<
      MessagesDeleteMutationResponseType,
      ResponseErrorConfig<Error>,
      { messageId: MessagesDeletePathParamsType['messageId'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? messagesDeleteMutationKey()

  return useMutation<MessagesDeleteMutationResponseType, ResponseErrorConfig<Error>, { messageId: MessagesDeletePathParamsType['messageId'] }, TContext>({
    mutationFn: async ({ messageId }) => {
      return messagesDelete(messageId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}