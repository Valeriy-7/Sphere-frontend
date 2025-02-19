import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { CabinetsGetActiveQueryResponseType, CabinetsGetActive404Type } from '../../types/cabinets/CabinetsGetActiveType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const cabinetsGetActiveQueryKey = () => [{ url: '/cabinets/active' }] as const

export type CabinetsGetActiveQueryKey = ReturnType<typeof cabinetsGetActiveQueryKey>

/**
 * @description     Возвращает информацию об активном кабинете пользователя.    ### Особенности:    - Если активный кабинет не установлен, возвращает ошибку 404    - Содержит полную информацию о кабинете    - Учитывает права доступа пользователя
 * @summary Получение активного кабинета
 * {@link /cabinets/active}
 */
export async function cabinetsGetActive(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsGetActiveQueryResponseType, ResponseErrorConfig<CabinetsGetActive404Type>, unknown>({
    method: 'GET',
    url: `/cabinets/active`,
    ...requestConfig,
  })
  return res.data
}

export function cabinetsGetActiveQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = cabinetsGetActiveQueryKey()
  return queryOptions<CabinetsGetActiveQueryResponseType, ResponseErrorConfig<CabinetsGetActive404Type>, CabinetsGetActiveQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return cabinetsGetActive(config)
    },
  })
}

/**
 * @description     Возвращает информацию об активном кабинете пользователя.    ### Особенности:    - Если активный кабинет не установлен, возвращает ошибку 404    - Содержит полную информацию о кабинете    - Учитывает права доступа пользователя
 * @summary Получение активного кабинета
 * {@link /cabinets/active}
 */
export function useCabinetsGetActive<
  TData = CabinetsGetActiveQueryResponseType,
  TQueryData = CabinetsGetActiveQueryResponseType,
  TQueryKey extends QueryKey = CabinetsGetActiveQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<CabinetsGetActiveQueryResponseType, ResponseErrorConfig<CabinetsGetActive404Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? cabinetsGetActiveQueryKey()

  const query = useQuery({
    ...(cabinetsGetActiveQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<CabinetsGetActive404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}