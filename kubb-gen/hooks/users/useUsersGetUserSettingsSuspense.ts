import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { UsersGetUserSettingsQueryResponseType } from '../../types/users/UsersGetUserSettingsType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const usersGetUserSettingsSuspenseQueryKey = () => [{ url: '/users/settings' }] as const

export type UsersGetUserSettingsSuspenseQueryKey = ReturnType<typeof usersGetUserSettingsSuspenseQueryKey>

/**
 * @description     Возвращает полные настройки пользователя.    ### Возвращаемые данные:    - Основная информация    - Настройки уведомлений    - Предпочтения интерфейса
 * @summary Получение настроек пользователя
 * {@link /users/settings}
 */
export async function usersGetUserSettingsSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UsersGetUserSettingsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/users/settings`,
    ...requestConfig,
  })
  return res.data
}

export function usersGetUserSettingsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = usersGetUserSettingsSuspenseQueryKey()
  return queryOptions<UsersGetUserSettingsQueryResponseType, ResponseErrorConfig<Error>, UsersGetUserSettingsQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return usersGetUserSettingsSuspense(config)
    },
  })
}

/**
 * @description     Возвращает полные настройки пользователя.    ### Возвращаемые данные:    - Основная информация    - Настройки уведомлений    - Предпочтения интерфейса
 * @summary Получение настроек пользователя
 * {@link /users/settings}
 */
export function useUsersGetUserSettingsSuspense<
  TData = UsersGetUserSettingsQueryResponseType,
  TQueryData = UsersGetUserSettingsQueryResponseType,
  TQueryKey extends QueryKey = UsersGetUserSettingsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<UsersGetUserSettingsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? usersGetUserSettingsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(usersGetUserSettingsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}