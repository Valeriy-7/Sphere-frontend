import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  DeliveryPointsGetAllDeliveryPointsQueryParamsType,
} from '../../types/services/DeliveryPointsGetAllDeliveryPointsType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const deliveryPointsGetAllDeliveryPointsSuspenseQueryKey = (
  params?: DeliveryPointsGetAllDeliveryPointsQueryParamsType,
) => [{ url: '/services/delivery-points/all' }, ...(params ? [params] : [])] as const;

export type DeliveryPointsGetAllDeliveryPointsSuspenseQueryKey = ReturnType<
  typeof deliveryPointsGetAllDeliveryPointsSuspenseQueryKey
>;

/**
 * @description Возвращает полный список точек доставки без фильтрации по типу. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе.
 * @summary Получить полный список точек доставки
 * {@link /services/delivery-points/all}
 */
export async function deliveryPointsGetAllDeliveryPointsSuspense(
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

export function deliveryPointsGetAllDeliveryPointsSuspenseQueryOptions(
  params?: DeliveryPointsGetAllDeliveryPointsQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryPointsGetAllDeliveryPointsSuspenseQueryKey(params);
  return queryOptions<
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveryPointsGetAllDeliveryPointsSuspense(params, config);
    },
  });
}

/**
 * @description Возвращает полный список точек доставки без фильтрации по типу. Фулфилменты, связанные с текущим кабинетом, будут приоритизированы в ответе.
 * @summary Получить полный список точек доставки
 * {@link /services/delivery-points/all}
 */
export function useDeliveryPointsGetAllDeliveryPointsSuspense<
  TData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryPointsGetAllDeliveryPointsSuspenseQueryKey,
>(
  params?: DeliveryPointsGetAllDeliveryPointsQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveryPointsGetAllDeliveryPointsQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? deliveryPointsGetAllDeliveryPointsSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(deliveryPointsGetAllDeliveryPointsSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
