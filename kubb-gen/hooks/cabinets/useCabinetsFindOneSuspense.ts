import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import type { CabinetsFindOneQueryResponseType, CabinetsFindOnePathParamsType, CabinetsFindOne404Type } from '../../types/cabinets/CabinetsFindOneType'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const cabinetsFindOneSuspenseQueryKey = (id: CabinetsFindOnePathParamsType['id']) => [{ url: '/cabinets/:id', params: { id: id } }] as const

export type CabinetsFindOneSuspenseQueryKey = ReturnType<typeof cabinetsFindOneSuspenseQueryKey>

/**
 * @description     Возвращает детальную информацию о конкретном кабинете.    ### Возвращаемые данные:    - Основная информация о компании    - Юридический и фактический адреса    - Контактные данные    - Банковские реквизиты    - Статусы и настройки
 * @summary Получение информации о кабинете
 * {@link /cabinets/:id}
 */
export async function cabinetsFindOneSuspense(id: CabinetsFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsFindOneQueryResponseType, ResponseErrorConfig<CabinetsFindOne404Type>, unknown>({
    method: 'GET',
    url: `/cabinets/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function cabinetsFindOneSuspenseQueryOptions(id: CabinetsFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = cabinetsFindOneSuspenseQueryKey(id)
  return queryOptions<CabinetsFindOneQueryResponseType, ResponseErrorConfig<CabinetsFindOne404Type>, CabinetsFindOneQueryResponseType, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return cabinetsFindOneSuspense(id, config)
    },
  })
}

/**
 * @description     Возвращает детальную информацию о конкретном кабинете.    ### Возвращаемые данные:    - Основная информация о компании    - Юридический и фактический адреса    - Контактные данные    - Банковские реквизиты    - Статусы и настройки
 * @summary Получение информации о кабинете
 * {@link /cabinets/:id}
 */
export function useCabinetsFindOneSuspense<
  TData = CabinetsFindOneQueryResponseType,
  TQueryData = CabinetsFindOneQueryResponseType,
  TQueryKey extends QueryKey = CabinetsFindOneSuspenseQueryKey,
>(
  id: CabinetsFindOnePathParamsType['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<CabinetsFindOneQueryResponseType, ResponseErrorConfig<CabinetsFindOne404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? cabinetsFindOneSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(cabinetsFindOneSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<CabinetsFindOne404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}