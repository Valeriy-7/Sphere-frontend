import client from '@/modules/auth/axios-client'
import type { DeliveriesGetDeliveriesQueryResponseType, DeliveriesGetDeliveriesQueryParamsType } from '../../types/deliveries/DeliveriesGetDeliveriesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const deliveriesGetDeliveriesQueryKey = (params?: DeliveriesGetDeliveriesQueryParamsType) =>
  [{ url: '/deliveries' }, ...(params ? [params] : [])] as const

export type DeliveriesGetDeliveriesQueryKey = ReturnType<typeof deliveriesGetDeliveriesQueryKey>

/**
 * @description     Возвращает список поставок для текущего кабинета.    ### Возможности фильтрации:    - По статусу поставки    - По дате создания    - По дате поставки    ### Включенные данные:    - Основная информация о поставке    - Список товаров    - Информация о поставщиках    - Выбранные услуги и расходники
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export async function deliveriesGetDeliveries(
  params?: DeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveriesGetDeliveriesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/deliveries`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function deliveriesGetDeliveriesQueryOptions(
  params?: DeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetDeliveriesQueryKey(params)
  return queryOptions<DeliveriesGetDeliveriesQueryResponseType, ResponseErrorConfig<Error>, DeliveriesGetDeliveriesQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveriesGetDeliveries(params, config)
    },
  })
}

/**
 * @description     Возвращает список поставок для текущего кабинета.    ### Возможности фильтрации:    - По статусу поставки    - По дате создания    - По дате поставки    ### Включенные данные:    - Основная информация о поставке    - Список товаров    - Информация о поставщиках    - Выбранные услуги и расходники
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export function useDeliveriesGetDeliveries<
  TData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetDeliveriesQueryKey,
>(
  params?: DeliveriesGetDeliveriesQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<DeliveriesGetDeliveriesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveriesGetDeliveriesQueryKey(params)

  const query = useQuery({
    ...(deliveriesGetDeliveriesQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}