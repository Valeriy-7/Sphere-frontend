import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { CabinetsGetActiveQueryResponseType, CabinetsGetActive404Type } from '../../types/cabinets/CabinetsGetActiveType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const cabinetsGetActiveSuspenseQueryKey = () => [{ url: '/cabinets/active' }] as const

export type CabinetsGetActiveSuspenseQueryKey = ReturnType<typeof cabinetsGetActiveSuspenseQueryKey>

/**
 * @description     Возвращает информацию об активном кабинете пользователя.    ### Особенности:    - Если активный кабинет не установлен, возвращает ошибку 404    - Содержит полную информацию о кабинете    - Учитывает права доступа пользователя    - Возвращает токен кабинета для аутентификации
 * @summary Получение активного кабинета
 * {@link /cabinets/active}
 */
export async function cabinetsGetActiveSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsGetActiveQueryResponseType, ResponseErrorConfig<CabinetsGetActive404Type>, unknown>({
    method: 'GET',
    url: `/cabinets/active`,
    ...requestConfig,
  })
  return res.data
}

export function cabinetsGetActiveSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = cabinetsGetActiveSuspenseQueryKey()
  return queryOptions<CabinetsGetActiveQueryResponseType, ResponseErrorConfig<CabinetsGetActive404Type>, CabinetsGetActiveQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return cabinetsGetActiveSuspense(config)
    },
  })
}

/**
 * @description     Возвращает информацию об активном кабинете пользователя.    ### Особенности:    - Если активный кабинет не установлен, возвращает ошибку 404    - Содержит полную информацию о кабинете    - Учитывает права доступа пользователя    - Возвращает токен кабинета для аутентификации
 * @summary Получение активного кабинета
 * {@link /cabinets/active}
 */
export function useCabinetsGetActiveSuspense<
  TData = CabinetsGetActiveQueryResponseType,
  TQueryData = CabinetsGetActiveQueryResponseType,
  TQueryKey extends QueryKey = CabinetsGetActiveSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<CabinetsGetActiveQueryResponseType, ResponseErrorConfig<CabinetsGetActive404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? cabinetsGetActiveSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(cabinetsGetActiveSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<CabinetsGetActive404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}