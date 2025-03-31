import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type {
  FFAccountDeliveriesGetDeliveriesQueryResponseType,
  FFAccountDeliveriesGetDeliveriesQueryParamsType,
} from '../../types/ff-account/FFAccountDeliveriesGetDeliveriesType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFAccountDeliveriesGetDeliveriesQueryKey = (params?: FFAccountDeliveriesGetDeliveriesQueryParamsType) =>
  [{ url: '/ff-account/deliveries' }, ...(params ? [params] : [])] as const

export type FFAccountDeliveriesGetDeliveriesQueryKey = ReturnType<typeof FFAccountDeliveriesGetDeliveriesQueryKey>

/**
 * @description Возвращает список поставок с возможностью фильтрации по статусу и периоду дат. Также включает информацию о маршрутах, поставщиках и общую статистику.
 * @summary Получить список поставок
 * {@link /ff-account/deliveries}
 */
export async function FFAccountDeliveriesGetDeliveries(
  params?: FFAccountDeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFAccountDeliveriesGetDeliveriesQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/deliveries`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function FFAccountDeliveriesGetDeliveriesQueryOptions(
  params?: FFAccountDeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFAccountDeliveriesGetDeliveriesQueryKey(params)
  return queryOptions<
    FFAccountDeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<Error>,
    FFAccountDeliveriesGetDeliveriesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFAccountDeliveriesGetDeliveries(params, config)
    },
  })
}

/**
 * @description Возвращает список поставок с возможностью фильтрации по статусу и периоду дат. Также включает информацию о маршрутах, поставщиках и общую статистику.
 * @summary Получить список поставок
 * {@link /ff-account/deliveries}
 */
export function useFFAccountDeliveriesGetDeliveries<
  TData = FFAccountDeliveriesGetDeliveriesQueryResponseType,
  TQueryData = FFAccountDeliveriesGetDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetDeliveriesQueryKey,
>(
  params?: FFAccountDeliveriesGetDeliveriesQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<FFAccountDeliveriesGetDeliveriesQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountDeliveriesGetDeliveriesQueryKey(params)

  const query = useQuery({
    ...(FFAccountDeliveriesGetDeliveriesQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}