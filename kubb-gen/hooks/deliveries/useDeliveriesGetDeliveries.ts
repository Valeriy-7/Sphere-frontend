import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  DeliveriesGetDeliveriesQueryResponseType,
  DeliveriesGetDeliveries401Type,
} from '../../types/deliveries/DeliveriesGetDeliveriesType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const deliveriesGetDeliveriesQueryKey = () => [{ url: '/deliveries' }] as const;

export type DeliveriesGetDeliveriesQueryKey = ReturnType<typeof deliveriesGetDeliveriesQueryKey>;

/**
 * @description Возвращает список всех поставок текущего кабинета
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export async function deliveriesGetDeliveries(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<DeliveriesGetDeliveries401Type>,
    unknown
  >({
    method: 'GET',
    url: `/deliveries`,
    ...requestConfig,
  });
  return res.data;
}

export function deliveriesGetDeliveriesQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetDeliveriesQueryKey();
  return queryOptions<
    DeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<DeliveriesGetDeliveries401Type>,
    DeliveriesGetDeliveriesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetDeliveries(config);
    },
  });
}

/**
 * @description Возвращает список всех поставок текущего кабинета
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export function useDeliveriesGetDeliveries<
  TData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetDeliveriesQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        DeliveriesGetDeliveriesQueryResponseType,
        ResponseErrorConfig<DeliveriesGetDeliveries401Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveriesGetDeliveriesQueryKey();

  const query = useQuery({
    ...(deliveriesGetDeliveriesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<DeliveriesGetDeliveries401Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
