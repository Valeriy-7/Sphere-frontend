import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type { DeliveryPointsGetAllDeliveryPointsQueryResponseType } from '../../types/services/DeliveryPointsGetAllDeliveryPointsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const deliveryPointsGetAllDeliveryPointsQueryKey = () =>
  [{ url: '/services/delivery-points/all' }] as const;

export type DeliveryPointsGetAllDeliveryPointsQueryKey = ReturnType<
  typeof deliveryPointsGetAllDeliveryPointsQueryKey
>;

/**
 * @description     Возвращает полный список всех точек доставки без фильтрации.    Включает:    - Все склады Wildberries    - Все склады фулфилмент-операторов    - Все точки маркетплейсов
 * @summary Получение полного списка точек доставки
 * {@link /services/delivery-points/all}
 */
export async function deliveryPointsGetAllDeliveryPoints(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/services/delivery-points/all`,
    ...requestConfig,
  });
  return res.data;
}

export function deliveryPointsGetAllDeliveryPointsQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryPointsGetAllDeliveryPointsQueryKey();
  return queryOptions<
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveryPointsGetAllDeliveryPoints(config);
    },
  });
}

/**
 * @description     Возвращает полный список всех точек доставки без фильтрации.    Включает:    - Все склады Wildberries    - Все склады фулфилмент-операторов    - Все точки маркетплейсов
 * @summary Получение полного списка точек доставки
 * {@link /services/delivery-points/all}
 */
export function useDeliveryPointsGetAllDeliveryPoints<
  TData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryPointsGetAllDeliveryPointsQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        DeliveryPointsGetAllDeliveryPointsQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveryPointsGetAllDeliveryPointsQueryKey();

  const query = useQuery({
    ...(deliveryPointsGetAllDeliveryPointsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
