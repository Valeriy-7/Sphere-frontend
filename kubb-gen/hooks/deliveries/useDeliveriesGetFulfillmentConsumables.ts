import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  DeliveriesGetFulfillmentConsumablesQueryResponseType,
  DeliveriesGetFulfillmentConsumables401Type,
  DeliveriesGetFulfillmentConsumables404Type,
} from '../../types/deliveries/DeliveriesGetFulfillmentConsumablesType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const deliveriesGetFulfillmentConsumablesQueryKey = () =>
  [{ url: '/deliveries/ff-consumables' }] as const;

export type DeliveriesGetFulfillmentConsumablesQueryKey = ReturnType<
  typeof deliveriesGetFulfillmentConsumablesQueryKey
>;

/**
 * @description Возвращает список всех доступных расходников от привязанного фулфилмент кабинета
 * @summary Получение списка расходников фулфилмента
 * {@link /deliveries/ff-consumables}
 */
export async function deliveriesGetFulfillmentConsumables(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesGetFulfillmentConsumablesQueryResponseType,
    ResponseErrorConfig<
      DeliveriesGetFulfillmentConsumables401Type | DeliveriesGetFulfillmentConsumables404Type
    >,
    unknown
  >({ method: 'GET', url: `/deliveries/ff-consumables`, ...requestConfig });
  return res.data;
}

export function deliveriesGetFulfillmentConsumablesQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetFulfillmentConsumablesQueryKey();
  return queryOptions<
    DeliveriesGetFulfillmentConsumablesQueryResponseType,
    ResponseErrorConfig<
      DeliveriesGetFulfillmentConsumables401Type | DeliveriesGetFulfillmentConsumables404Type
    >,
    DeliveriesGetFulfillmentConsumablesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetFulfillmentConsumables(config);
    },
  });
}

/**
 * @description Возвращает список всех доступных расходников от привязанного фулфилмент кабинета
 * @summary Получение списка расходников фулфилмента
 * {@link /deliveries/ff-consumables}
 */
export function useDeliveriesGetFulfillmentConsumables<
  TData = DeliveriesGetFulfillmentConsumablesQueryResponseType,
  TQueryData = DeliveriesGetFulfillmentConsumablesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetFulfillmentConsumablesQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        DeliveriesGetFulfillmentConsumablesQueryResponseType,
        ResponseErrorConfig<
          DeliveriesGetFulfillmentConsumables401Type | DeliveriesGetFulfillmentConsumables404Type
        >,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveriesGetFulfillmentConsumablesQueryKey();

  const query = useQuery({
    ...(deliveriesGetFulfillmentConsumablesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<
      DeliveriesGetFulfillmentConsumables401Type | DeliveriesGetFulfillmentConsumables404Type
    >
  > & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
