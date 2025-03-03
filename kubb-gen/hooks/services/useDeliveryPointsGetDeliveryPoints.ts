import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  DeliveryPointsGetDeliveryPointsQueryResponseType,
  DeliveryPointsGetDeliveryPointsQueryParamsType,
} from '../../types/services/DeliveryPointsGetDeliveryPointsType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const deliveryPointsGetDeliveryPointsQueryKey = (
  params?: DeliveryPointsGetDeliveryPointsQueryParamsType,
) => [{ url: '/services/delivery-points' }, ...(params ? [params] : [])] as const;

export type DeliveryPointsGetDeliveryPointsQueryKey = ReturnType<
  typeof deliveryPointsGetDeliveryPointsQueryKey
>;

/**
 * @description Возвращает список точек доставки. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе.
 * @summary Получить список точек доставки
 * {@link /services/delivery-points}
 */
export async function deliveryPointsGetDeliveryPoints(
  params?: DeliveryPointsGetDeliveryPointsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveryPointsGetDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/services/delivery-points`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function deliveryPointsGetDeliveryPointsQueryOptions(
  params?: DeliveryPointsGetDeliveryPointsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryPointsGetDeliveryPointsQueryKey(params);
  return queryOptions<
    DeliveryPointsGetDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryPointsGetDeliveryPointsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveryPointsGetDeliveryPoints(params, config);
    },
  });
}

/**
 * @description Возвращает список точек доставки. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе.
 * @summary Получить список точек доставки
 * {@link /services/delivery-points}
 */
export function useDeliveryPointsGetDeliveryPoints<
  TData = DeliveryPointsGetDeliveryPointsQueryResponseType,
  TQueryData = DeliveryPointsGetDeliveryPointsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryPointsGetDeliveryPointsQueryKey,
>(
  params?: DeliveryPointsGetDeliveryPointsQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        DeliveryPointsGetDeliveryPointsQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? deliveryPointsGetDeliveryPointsQueryKey(params);

  const query = useQuery({
    ...(deliveryPointsGetDeliveryPointsQueryOptions(
      params,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
