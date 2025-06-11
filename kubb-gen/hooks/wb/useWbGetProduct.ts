import client from '@/modules/auth/axios-client'
import type { WbGetProductQueryResponseType, WbGetProductPathParamsType, WbGetProductQueryParamsType } from '../../types/wb/WbGetProductType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const wbGetProductQueryKey = (id: WbGetProductPathParamsType['id'], params: WbGetProductQueryParamsType) =>
  [{ url: '/wb/products/:id', params: { id: id } }, ...(params ? [params] : [])] as const

export type WbGetProductQueryKey = ReturnType<typeof wbGetProductQueryKey>

/**
 * @description Возвращает детальную информацию о конкретном продукте
 * @summary Получить информацию о продукте
 * {@link /wb/products/:id}
 */
export async function wbGetProduct(
  id: WbGetProductPathParamsType['id'],
  params: WbGetProductQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbGetProductQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/products/${id}`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function wbGetProductQueryOptions(
  id: WbGetProductPathParamsType['id'],
  params: WbGetProductQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbGetProductQueryKey(id, params)
  return queryOptions<WbGetProductQueryResponseType, ResponseErrorConfig<Error>, WbGetProductQueryResponseType, typeof queryKey>({
    enabled: !!(id && params),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbGetProduct(id, params, config)
    },
  })
}

/**
 * @description Возвращает детальную информацию о конкретном продукте
 * @summary Получить информацию о продукте
 * {@link /wb/products/:id}
 */
export function useWbGetProduct<
  TData = WbGetProductQueryResponseType,
  TQueryData = WbGetProductQueryResponseType,
  TQueryKey extends QueryKey = WbGetProductQueryKey,
>(
  id: WbGetProductPathParamsType['id'],
  params: WbGetProductQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<WbGetProductQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbGetProductQueryKey(id, params)

  const query = useQuery({
    ...(wbGetProductQueryOptions(id, params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}