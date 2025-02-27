import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type { UsersGetUserSettingsQueryResponseType } from '../../types/users/UsersGetUserSettingsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const usersGetUserSettingsQueryKey = () => [{ url: '/users/settings' }] as const;

export type UsersGetUserSettingsQueryKey = ReturnType<typeof usersGetUserSettingsQueryKey>;

/**
 * @description     Возвращает полные настройки пользователя.    ### Возвращаемые данные:    - Основная информация    - Настройки уведомлений    - Предпочтения интерфейса
 * @summary Получение настроек пользователя
 * {@link /users/settings}
 */
export async function usersGetUserSettings(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UsersGetUserSettingsQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/users/settings`,
    ...requestConfig,
  });
  return res.data;
}

export function usersGetUserSettingsQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = usersGetUserSettingsQueryKey();
  return queryOptions<
    UsersGetUserSettingsQueryResponseType,
    ResponseErrorConfig<Error>,
    UsersGetUserSettingsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return usersGetUserSettings(config);
    },
  });
}

/**
 * @description     Возвращает полные настройки пользователя.    ### Возвращаемые данные:    - Основная информация    - Настройки уведомлений    - Предпочтения интерфейса
 * @summary Получение настроек пользователя
 * {@link /users/settings}
 */
export function useUsersGetUserSettings<
  TData = UsersGetUserSettingsQueryResponseType,
  TQueryData = UsersGetUserSettingsQueryResponseType,
  TQueryKey extends QueryKey = UsersGetUserSettingsQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        UsersGetUserSettingsQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? usersGetUserSettingsQueryKey();

  const query = useQuery({
    ...(usersGetUserSettingsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
