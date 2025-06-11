import client from '@/modules/auth/axios-client'
import type { AdminGetListQueryResponseType, AdminGetListQueryParamsType } from '../../types/admin/AdminGetListType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const adminGetListSuspenseQueryKey = (params?: AdminGetListQueryParamsType) => [{ url: '/admin/list' }, ...(params ? [params] : [])] as const

export type AdminGetListSuspenseQueryKey = ReturnType<typeof adminGetListSuspenseQueryKey>

/**
 * @description     Возвращает список пользователей и кабинетов с возможностью фильтрации и пагинации.    ### Режимы отображения:    - all: Общий список    - requests: Список заявок    - blocked: Список заблокированных    ### Поиск по:    - ФИО    - ИНН    - Названию организации    ### Фильтры:    - Тип организации    - Дата    - Номер 1 / Номер 2    ### Сортировка:    - По типу организации    - По дате    - По номерам    ### Пагинация:    - limit: количество элементов на странице    - limit=-1: получить все элементы без пагинации    - page: номер страницы    ### Даты в разных режимах:    - all: дата создания кабинета    - requests: дата подачи заявки    - blocked: дата блокировки
 * @summary Получение списка
 * {@link /admin/list}
 */
export async function adminGetListSuspense(params?: AdminGetListQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AdminGetListQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/admin/list`, params, ...requestConfig })
  return res.data
}

export function adminGetListSuspenseQueryOptions(params?: AdminGetListQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = adminGetListSuspenseQueryKey(params)
  return queryOptions<AdminGetListQueryResponseType, ResponseErrorConfig<Error>, AdminGetListQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return adminGetListSuspense(params, config)
    },
  })
}

/**
 * @description     Возвращает список пользователей и кабинетов с возможностью фильтрации и пагинации.    ### Режимы отображения:    - all: Общий список    - requests: Список заявок    - blocked: Список заблокированных    ### Поиск по:    - ФИО    - ИНН    - Названию организации    ### Фильтры:    - Тип организации    - Дата    - Номер 1 / Номер 2    ### Сортировка:    - По типу организации    - По дате    - По номерам    ### Пагинация:    - limit: количество элементов на странице    - limit=-1: получить все элементы без пагинации    - page: номер страницы    ### Даты в разных режимах:    - all: дата создания кабинета    - requests: дата подачи заявки    - blocked: дата блокировки
 * @summary Получение списка
 * {@link /admin/list}
 */
export function useAdminGetListSuspense<
  TData = AdminGetListQueryResponseType,
  TQueryData = AdminGetListQueryResponseType,
  TQueryKey extends QueryKey = AdminGetListSuspenseQueryKey,
>(
  params?: AdminGetListQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<AdminGetListQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? adminGetListSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(adminGetListSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}