import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { CabinetsGetPartnersQueryResponseType, CabinetsGetPartnersQueryParamsType } from '../../types/cabinets/CabinetsGetPartnersType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const cabinetsGetPartnersQueryKey = (params?: CabinetsGetPartnersQueryParamsType) =>
  [{ url: '/cabinets/partners' }, ...(params ? [params] : [])] as const

export type CabinetsGetPartnersQueryKey = ReturnType<typeof cabinetsGetPartnersQueryKey>

/**
 * @description     Возвращает список партнерских кабинетов с пагинацией, поиском и сортировкой.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка партнерских кабинетов
 * {@link /cabinets/partners}
 */
export async function cabinetsGetPartners(params?: CabinetsGetPartnersQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsGetPartnersQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/cabinets/partners`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function cabinetsGetPartnersQueryOptions(params?: CabinetsGetPartnersQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = cabinetsGetPartnersQueryKey(params)
  return queryOptions<CabinetsGetPartnersQueryResponseType, ResponseErrorConfig<Error>, CabinetsGetPartnersQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return cabinetsGetPartners(params, config)
    },
  })
}

/**
 * @description     Возвращает список партнерских кабинетов с пагинацией, поиском и сортировкой.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка партнерских кабинетов
 * {@link /cabinets/partners}
 */
export function useCabinetsGetPartners<
  TData = CabinetsGetPartnersQueryResponseType,
  TQueryData = CabinetsGetPartnersQueryResponseType,
  TQueryKey extends QueryKey = CabinetsGetPartnersQueryKey,
>(
  params?: CabinetsGetPartnersQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<CabinetsGetPartnersQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? cabinetsGetPartnersQueryKey(params)

  const query = useQuery({
    ...(cabinetsGetPartnersQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}