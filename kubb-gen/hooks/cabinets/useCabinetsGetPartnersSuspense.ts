import client from '@/modules/auth/axios-client'
import type { CabinetsGetPartnersQueryResponseType, CabinetsGetPartnersQueryParamsType } from '../../types/cabinets/CabinetsGetPartnersType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const cabinetsGetPartnersSuspenseQueryKey = (params?: CabinetsGetPartnersQueryParamsType) =>
  [{ url: '/cabinets/partners' }, ...(params ? [params] : [])] as const

export type CabinetsGetPartnersSuspenseQueryKey = ReturnType<typeof cabinetsGetPartnersSuspenseQueryKey>

/**
 * @description     Возвращает список партнерских кабинетов с пагинацией, поиском и сортировкой.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка партнерских кабинетов
 * {@link /cabinets/partners}
 */
export async function cabinetsGetPartnersSuspense(
  params?: CabinetsGetPartnersQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsGetPartnersQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/cabinets/partners`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function cabinetsGetPartnersSuspenseQueryOptions(
  params?: CabinetsGetPartnersQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = cabinetsGetPartnersSuspenseQueryKey(params)
  return queryOptions<CabinetsGetPartnersQueryResponseType, ResponseErrorConfig<Error>, CabinetsGetPartnersQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return cabinetsGetPartnersSuspense(params, config)
    },
  })
}

/**
 * @description     Возвращает список партнерских кабинетов с пагинацией, поиском и сортировкой.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка партнерских кабинетов
 * {@link /cabinets/partners}
 */
export function useCabinetsGetPartnersSuspense<
  TData = CabinetsGetPartnersQueryResponseType,
  TQueryData = CabinetsGetPartnersQueryResponseType,
  TQueryKey extends QueryKey = CabinetsGetPartnersSuspenseQueryKey,
>(
  params?: CabinetsGetPartnersQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<CabinetsGetPartnersQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? cabinetsGetPartnersSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(cabinetsGetPartnersSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}