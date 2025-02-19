import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { UsersGetCurrentUserQueryResponseType } from '../../types/users/UsersGetCurrentUserType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const usersGetCurrentUserSuspenseQueryKey = () => [{ url: '/users/me' }] as const

export type UsersGetCurrentUserSuspenseQueryKey = ReturnType<typeof usersGetCurrentUserSuspenseQueryKey>

/**
 * @description     Возвращает информацию о текущем пользователе и его кабинетах.    ### Возвращаемые данные:    - Основная информация о пользователе    - Список кабинетов с базовой информацией    - Статус регистрации
 * @summary Получение информации о текущем пользователе
 * {@link /users/me}
 */
export async function usersGetCurrentUserSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersGetCurrentUserQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/users/me`, ...requestConfig })
  return res.data
}

export function usersGetCurrentUserSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersGetCurrentUserSuspenseQueryKey()
  return queryOptions<UsersGetCurrentUserQueryResponseType, ResponseErrorConfig<Error>, UsersGetCurrentUserQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return usersGetCurrentUserSuspense(config)
    },
  })
}

/**
 * @description     Возвращает информацию о текущем пользователе и его кабинетах.    ### Возвращаемые данные:    - Основная информация о пользователе    - Список кабинетов с базовой информацией    - Статус регистрации
 * @summary Получение информации о текущем пользователе
 * {@link /users/me}
 */
export function useUsersGetCurrentUserSuspense<
  TData = UsersGetCurrentUserQueryResponseType,
  TQueryData = UsersGetCurrentUserQueryResponseType,
  TQueryKey extends QueryKey = UsersGetCurrentUserSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<UsersGetCurrentUserQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersGetCurrentUserSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(usersGetCurrentUserSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}