import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  UsersUpdateProfileMutationRequestType,
  UsersUpdateProfileMutationResponseType,
  UsersUpdateProfile404Type,
} from '../../types/users/UsersUpdateProfileType'
import { useMutation } from '@tanstack/react-query'

export const usersUpdateProfileMutationKey = () => [{ url: '/users/profile' }] as const

export type UsersUpdateProfileMutationKey = ReturnType<typeof usersUpdateProfileMutationKey>

/**
 * @description Обновляет ФИО пользователя
 * @summary Обновление профиля пользователя
 * {@link /users/profile}
 */
export async function usersUpdateProfile(
  data: UsersUpdateProfileMutationRequestType,
  config: Partial<RequestConfig<UsersUpdateProfileMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersUpdateProfileMutationResponseType, ResponseErrorConfig<UsersUpdateProfile404Type>, UsersUpdateProfileMutationRequestType>({
    method: 'PATCH',
    url: `/users/profile`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Обновляет ФИО пользователя
 * @summary Обновление профиля пользователя
 * {@link /users/profile}
 */
export function useUsersUpdateProfile(
  options: {
    mutation?: UseMutationOptions<
      UsersUpdateProfileMutationResponseType,
      ResponseErrorConfig<UsersUpdateProfile404Type>,
      { data: UsersUpdateProfileMutationRequestType }
    >
    client?: Partial<RequestConfig<UsersUpdateProfileMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? usersUpdateProfileMutationKey()

  return useMutation<UsersUpdateProfileMutationResponseType, ResponseErrorConfig<UsersUpdateProfile404Type>, { data: UsersUpdateProfileMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return usersUpdateProfile(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}