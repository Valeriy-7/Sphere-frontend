import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  DeliveryPointsGetAllDeliveryPointsQueryParamsType,
} from '../../types/services/DeliveryPointsGetAllDeliveryPointsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const deliveryPointsGetAllDeliveryPointsQueryKey = (
  params?: DeliveryPointsGetAllDeliveryPointsQueryParamsType,
) => [{ url: '/services/delivery-points/all' }, ...(params ? [params] : [])] as const;

export type DeliveryPointsGetAllDeliveryPointsQueryKey = ReturnType<
  typeof deliveryPointsGetAllDeliveryPointsQueryKey
>;

/**
 * @description Возвращает полный список точек доставки с их адресами без фильтрации по типу. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе.
 * @summary Получить полный список точек доставки
 * {@link /services/delivery-points/all}
 */
export async function deliveryPointsGetAllDeliveryPoints(
  params?: DeliveryPointsGetAllDeliveryPointsQueryParamsType,
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
    params,
    ...requestConfig,
  });
  return res.data;
}

export function deliveryPointsGetAllDeliveryPointsQueryOptions(
  params?: DeliveryPointsGetAllDeliveryPointsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryPointsGetAllDeliveryPointsQueryKey(params);
  return queryOptions<
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveryPointsGetAllDeliveryPoints(params, config);
    },
  });
}

/**
 * @description Возвращает полный список точек доставки с их адресами без фильтрации по типу. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе.
 * @summary Получить полный список точек доставки
 * {@link /services/delivery-points/all}
 */
export function useDeliveryPointsGetAllDeliveryPoints<
  TData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryPointsGetAllDeliveryPointsQueryKey,
>(
  params?: DeliveryPointsGetAllDeliveryPointsQueryParamsType,
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
  const queryKey = queryOptions?.queryKey ?? deliveryPointsGetAllDeliveryPointsQueryKey(params);

  const query = useQuery({
    ...(deliveryPointsGetAllDeliveryPointsQueryOptions(
      params,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
