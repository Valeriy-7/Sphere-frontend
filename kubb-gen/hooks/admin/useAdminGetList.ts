import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { AdminGetListQueryResponseType, AdminGetListQueryParamsType } from '../../types/admin/AdminGetListType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const adminGetListQueryKey = (params?: AdminGetListQueryParamsType) => [{ url: '/admin/list' }, ...(params ? [params] : [])] as const

export type AdminGetListQueryKey = ReturnType<typeof adminGetListQueryKey>

/**
 * @description     Возвращает список пользователей и кабинетов с возможностью фильтрации и пагинации.    ### Режимы отображения:    - all: Общий список    - requests: Список заявок    - blocked: Список заблокированных    ### Поиск по:    - ФИО    - ИНН    - Названию организации    ### Фильтры:    - Тип организации    - Дата    - Номер 1 / Номер 2    ### Сортировка:    - По типу организации    - По дате    - По номерам    ### Пагинация:    - limit: количество элементов на странице    - limit=-1: получить все элементы без пагинации    - page: номер страницы    ### Даты в разных режимах:    - all: дата создания кабинета    - requests: дата подачи заявки    - blocked: дата блокировки
 * @summary Получение списка
 * {@link /admin/list}
 */
export async function adminGetList(params?: AdminGetListQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AdminGetListQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/admin/list`, params, ...requestConfig })
  return res.data
}

export function adminGetListQueryOptions(params?: AdminGetListQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = adminGetListQueryKey(params)
  return queryOptions<AdminGetListQueryResponseType, ResponseErrorConfig<Error>, AdminGetListQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return adminGetList(params, config)
    },
  })
}

/**
 * @description     Возвращает список пользователей и кабинетов с возможностью фильтрации и пагинации.    ### Режимы отображения:    - all: Общий список    - requests: Список заявок    - blocked: Список заблокированных    ### Поиск по:    - ФИО    - ИНН    - Названию организации    ### Фильтры:    - Тип организации    - Дата    - Номер 1 / Номер 2    ### Сортировка:    - По типу организации    - По дате    - По номерам    ### Пагинация:    - limit: количество элементов на странице    - limit=-1: получить все элементы без пагинации    - page: номер страницы    ### Даты в разных режимах:    - all: дата создания кабинета    - requests: дата подачи заявки    - blocked: дата блокировки
 * @summary Получение списка
 * {@link /admin/list}
 */
export function useAdminGetList<
  TData = AdminGetListQueryResponseType,
  TQueryData = AdminGetListQueryResponseType,
  TQueryKey extends QueryKey = AdminGetListQueryKey,
>(
  params?: AdminGetListQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<AdminGetListQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? adminGetListQueryKey(params)

  const query = useQuery({
    ...(adminGetListQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}