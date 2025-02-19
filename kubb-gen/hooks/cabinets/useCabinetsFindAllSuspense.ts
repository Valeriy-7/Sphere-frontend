import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { CabinetsFindAllQueryResponseType } from '../../types/cabinets/CabinetsFindAllType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const cabinetsFindAllSuspenseQueryKey = () => [{ url: '/cabinets' }] as const

export type CabinetsFindAllSuspenseQueryKey = ReturnType<typeof cabinetsFindAllSuspenseQueryKey>

/**
 * @description     Возвращает список всех кабинетов текущего пользователя.    ### Особенности:    - Сортировка по дате создания (сначала новые)    - Включает все типы кабинетов (WB/FF)    - Содержит статусы верификации и активности
 * @summary Получение списка кабинетов пользователя
 * {@link /cabinets}
 */
export async function cabinetsFindAllSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/cabinets`, ...requestConfig })
  return res.data
}

export function cabinetsFindAllSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = cabinetsFindAllSuspenseQueryKey()
  return queryOptions<CabinetsFindAllQueryResponseType, ResponseErrorConfig<Error>, CabinetsFindAllQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return cabinetsFindAllSuspense(config)
    },
  })
}

/**
 * @description     Возвращает список всех кабинетов текущего пользователя.    ### Особенности:    - Сортировка по дате создания (сначала новые)    - Включает все типы кабинетов (WB/FF)    - Содержит статусы верификации и активности
 * @summary Получение списка кабинетов пользователя
 * {@link /cabinets}
 */
export function useCabinetsFindAllSuspense<
  TData = CabinetsFindAllQueryResponseType,
  TQueryData = CabinetsFindAllQueryResponseType,
  TQueryKey extends QueryKey = CabinetsFindAllSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<CabinetsFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? cabinetsFindAllSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(cabinetsFindAllSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}