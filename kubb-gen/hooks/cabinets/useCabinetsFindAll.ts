import client from '@/modules/auth/axios-client'
import type { CabinetsFindAllQueryResponseType } from '../../types/cabinets/CabinetsFindAllType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const cabinetsFindAllQueryKey = () => [{ url: '/cabinets' }] as const

export type CabinetsFindAllQueryKey = ReturnType<typeof cabinetsFindAllQueryKey>

/**
 * @description     Возвращает список всех кабинетов текущего пользователя.    ### Особенности:    - Сортировка по дате создания (сначала новые)    - Включает все типы кабинетов (WB/FF)    - Содержит статусы верификации и активности
 * @summary Получение списка кабинетов пользователя
 * {@link /cabinets}
 */
export async function cabinetsFindAll(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/cabinets`, ...requestConfig })
  return res.data
}

export function cabinetsFindAllQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = cabinetsFindAllQueryKey()
  return queryOptions<CabinetsFindAllQueryResponseType, ResponseErrorConfig<Error>, CabinetsFindAllQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return cabinetsFindAll(config)
    },
  })
}

/**
 * @description     Возвращает список всех кабинетов текущего пользователя.    ### Особенности:    - Сортировка по дате создания (сначала новые)    - Включает все типы кабинетов (WB/FF)    - Содержит статусы верификации и активности
 * @summary Получение списка кабинетов пользователя
 * {@link /cabinets}
 */
export function useCabinetsFindAll<
  TData = CabinetsFindAllQueryResponseType,
  TQueryData = CabinetsFindAllQueryResponseType,
  TQueryKey extends QueryKey = CabinetsFindAllQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<CabinetsFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? cabinetsFindAllQueryKey()

  const query = useQuery({
    ...(cabinetsFindAllQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}