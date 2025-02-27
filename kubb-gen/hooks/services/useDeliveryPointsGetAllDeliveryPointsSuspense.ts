import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type { DeliveryPointsGetAllDeliveryPointsQueryResponseType } from '../../types/services/DeliveryPointsGetAllDeliveryPointsType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const deliveryPointsGetAllDeliveryPointsSuspenseQueryKey = () =>
  [{ url: '/services/delivery-points/all' }] as const;

export type DeliveryPointsGetAllDeliveryPointsSuspenseQueryKey = ReturnType<
  typeof deliveryPointsGetAllDeliveryPointsSuspenseQueryKey
>;

/**
 * @description     Возвращает полный список всех точек доставки без фильтрации.    Включает:    - Все склады Wildberries    - Все склады фулфилмент-операторов    - Все точки маркетплейсов
 * @summary Получение полного списка точек доставки
 * {@link /services/delivery-points/all}
 */
export async function deliveryPointsGetAllDeliveryPointsSuspense(
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

export function deliveryPointsGetAllDeliveryPointsSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveryPointsGetAllDeliveryPointsSuspenseQueryKey();
  return queryOptions<
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveryPointsGetAllDeliveryPointsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveryPointsGetAllDeliveryPointsSuspense(config);
    },
  });
}

/**
 * @description     Возвращает полный список всех точек доставки без фильтрации.    Включает:    - Все склады Wildberries    - Все склады фулфилмент-операторов    - Все точки маркетплейсов
 * @summary Получение полного списка точек доставки
 * {@link /services/delivery-points/all}
 */
export function useDeliveryPointsGetAllDeliveryPointsSuspense<
  TData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryData = DeliveryPointsGetAllDeliveryPointsQueryResponseType,
  TQueryKey extends QueryKey = DeliveryPointsGetAllDeliveryPointsSuspenseQueryKey,
>(
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
  const queryKey = queryOptions?.queryKey ?? deliveryPointsGetAllDeliveryPointsSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(deliveryPointsGetAllDeliveryPointsSuspenseQueryOptions(
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
