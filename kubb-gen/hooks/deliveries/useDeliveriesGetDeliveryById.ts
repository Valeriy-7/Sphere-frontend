import client from '@/modules/auth/axios-client'
import type {
  DeliveriesGetDeliveryByIdQueryResponseType,
  DeliveriesGetDeliveryByIdPathParamsType,
  DeliveriesGetDeliveryById404Type,
} from '../../types/deliveries/DeliveriesGetDeliveryByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const deliveriesGetDeliveryByIdQueryKey = (id: DeliveriesGetDeliveryByIdPathParamsType['id']) =>
  [{ url: '/deliveries/:id', params: { id: id } }] as const

export type DeliveriesGetDeliveryByIdQueryKey = ReturnType<typeof deliveriesGetDeliveryByIdQueryKey>

/**
 * @description     Возвращает детальную информацию о конкретной поставке.    ### Включенные данные:    - Полная информация о поставке    - Детальный список товаров    - Информация о поставщиках    - Все выбранные услуги и расходники    - Расчет стоимости по каждой позиции
 * @summary Получение информации о поставке
 * {@link /deliveries/:id}
 */
export async function deliveriesGetDeliveryById(
  id: DeliveriesGetDeliveryByIdPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveriesGetDeliveryByIdQueryResponseType, ResponseErrorConfig<DeliveriesGetDeliveryById404Type>, unknown>({
    method: 'GET',
    url: `/deliveries/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function deliveriesGetDeliveryByIdQueryOptions(
  id: DeliveriesGetDeliveryByIdPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetDeliveryByIdQueryKey(id)
  return queryOptions<
    DeliveriesGetDeliveryByIdQueryResponseType,
    ResponseErrorConfig<DeliveriesGetDeliveryById404Type>,
    DeliveriesGetDeliveryByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveriesGetDeliveryById(id, config)
    },
  })
}

/**
 * @description     Возвращает детальную информацию о конкретной поставке.    ### Включенные данные:    - Полная информация о поставке    - Детальный список товаров    - Информация о поставщиках    - Все выбранные услуги и расходники    - Расчет стоимости по каждой позиции
 * @summary Получение информации о поставке
 * {@link /deliveries/:id}
 */
export function useDeliveriesGetDeliveryById<
  TData = DeliveriesGetDeliveryByIdQueryResponseType,
  TQueryData = DeliveriesGetDeliveryByIdQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetDeliveryByIdQueryKey,
>(
  id: DeliveriesGetDeliveryByIdPathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<DeliveriesGetDeliveryByIdQueryResponseType, ResponseErrorConfig<DeliveriesGetDeliveryById404Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveriesGetDeliveryByIdQueryKey(id)

  const query = useQuery({
    ...(deliveriesGetDeliveryByIdQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<DeliveriesGetDeliveryById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}