import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { UsersGetCurrentUserQueryResponseType } from '../../types/users/UsersGetCurrentUserType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const usersGetCurrentUserQueryKey = () => [{ url: '/users/me' }] as const

export type UsersGetCurrentUserQueryKey = ReturnType<typeof usersGetCurrentUserQueryKey>

/**
 * @description     Возвращает информацию о текущем пользователе и его кабинетах.    ### Возвращаемые данные:    - Основная информация о пользователе    - Список кабинетов с базовой информацией    - Статус регистрации
 * @summary Получение информации о текущем пользователе
 * {@link /users/me}
 */
export async function usersGetCurrentUser(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersGetCurrentUserQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/users/me`, ...requestConfig })
  return res.data
}

export function usersGetCurrentUserQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersGetCurrentUserQueryKey()
  return queryOptions<UsersGetCurrentUserQueryResponseType, ResponseErrorConfig<Error>, UsersGetCurrentUserQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return usersGetCurrentUser(config)
    },
  })
}

/**
 * @description     Возвращает информацию о текущем пользователе и его кабинетах.    ### Возвращаемые данные:    - Основная информация о пользователе    - Список кабинетов с базовой информацией    - Статус регистрации
 * @summary Получение информации о текущем пользователе
 * {@link /users/me}
 */
export function useUsersGetCurrentUser<
  TData = UsersGetCurrentUserQueryResponseType,
  TQueryData = UsersGetCurrentUserQueryResponseType,
  TQueryKey extends QueryKey = UsersGetCurrentUserQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<UsersGetCurrentUserQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersGetCurrentUserQueryKey()

  const query = useQuery({
    ...(usersGetCurrentUserQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}