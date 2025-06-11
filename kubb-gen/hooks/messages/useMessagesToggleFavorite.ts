import client from '@/modules/auth/axios-client'
import type { MessagesToggleFavoriteMutationRequestType, MessagesToggleFavoriteMutationResponseType } from '../../types/messages/MessagesToggleFavoriteType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const messagesToggleFavoriteMutationKey = () => [{ url: '/messages/favorite' }] as const

export type MessagesToggleFavoriteMutationKey = ReturnType<typeof messagesToggleFavoriteMutationKey>

/**
 * @summary Добавить/удалить сообщение из избранного
 * {@link /messages/favorite}
 */
export async function messagesToggleFavorite(
  data: MessagesToggleFavoriteMutationRequestType,
  config: Partial<RequestConfig<MessagesToggleFavoriteMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<MessagesToggleFavoriteMutationResponseType, ResponseErrorConfig<Error>, MessagesToggleFavoriteMutationRequestType>({
    method: 'POST',
    url: `/messages/favorite`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Добавить/удалить сообщение из избранного
 * {@link /messages/favorite}
 */
export function useMessagesToggleFavorite<TContext>(
  options: {
    mutation?: UseMutationOptions<
      MessagesToggleFavoriteMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: MessagesToggleFavoriteMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<MessagesToggleFavoriteMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? messagesToggleFavoriteMutationKey()

  return useMutation<MessagesToggleFavoriteMutationResponseType, ResponseErrorConfig<Error>, { data: MessagesToggleFavoriteMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return messagesToggleFavorite(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}