import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type { DeliveriesGetSuppliersQueryResponseType, DeliveriesGetSuppliers401Type } from '../../types/deliveries/DeliveriesGetSuppliersType'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const deliveriesGetSuppliersQueryKey = () => [{ url: '/deliveries/suppliers' }] as const

export type DeliveriesGetSuppliersQueryKey = ReturnType<typeof deliveriesGetSuppliersQueryKey>

/**
 * @description Возвращает список всех поставщиков текущего кабинета
 * @summary Получение списка поставщиков
 * {@link /deliveries/suppliers}
 */
export async function deliveriesGetSuppliers(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeliveriesGetSuppliersQueryResponseType, ResponseErrorConfig<DeliveriesGetSuppliers401Type>, unknown>({
    method: 'GET',
    url: `/deliveries/suppliers`,
    ...requestConfig,
  })
  return res.data
}

export function deliveriesGetSuppliersQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = deliveriesGetSuppliersQueryKey()
  return queryOptions<
    DeliveriesGetSuppliersQueryResponseType,
    ResponseErrorConfig<DeliveriesGetSuppliers401Type>,
    DeliveriesGetSuppliersQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return deliveriesGetSuppliers(config)
    },
  })
}

/**
 * @description Возвращает список всех поставщиков текущего кабинета
 * @summary Получение списка поставщиков
 * {@link /deliveries/suppliers}
 */
export function useDeliveriesGetSuppliers<
  TData = DeliveriesGetSuppliersQueryResponseType,
  TQueryData = DeliveriesGetSuppliersQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetSuppliersQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<DeliveriesGetSuppliersQueryResponseType, ResponseErrorConfig<DeliveriesGetSuppliers401Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? deliveriesGetSuppliersQueryKey()

  const query = useQuery({
    ...(deliveriesGetSuppliersQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<DeliveriesGetSuppliers401Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}