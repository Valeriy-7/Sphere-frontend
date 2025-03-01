import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type { DeliveriesGetFulfillmentServicesQueryResponseType } from '../../types/deliveries/DeliveriesGetFulfillmentServicesType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const deliveriesGetFulfillmentServicesQueryKey = () =>
  [{ url: '/deliveries/services' }] as const;

export type DeliveriesGetFulfillmentServicesQueryKey = ReturnType<
  typeof deliveriesGetFulfillmentServicesQueryKey
>;

/**
 * @summary Получение списка услуг фулфилмента
 * {@link /deliveries/services}
 */
export async function deliveriesGetFulfillmentServices(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesGetFulfillmentServicesQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/deliveries/services`,
    ...requestConfig,
  });
  return res.data;
}

export function deliveriesGetFulfillmentServicesQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetFulfillmentServicesQueryKey();
  return queryOptions<
    DeliveriesGetFulfillmentServicesQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveriesGetFulfillmentServicesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetFulfillmentServices(config);
    },
  });
}

/**
 * @summary Получение списка услуг фулфилмента
 * {@link /deliveries/services}
 */
export function useDeliveriesGetFulfillmentServices<
  TData = DeliveriesGetFulfillmentServicesQueryResponseType,
  TQueryData = DeliveriesGetFulfillmentServicesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetFulfillmentServicesQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        DeliveriesGetFulfillmentServicesQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? deliveriesGetFulfillmentServicesQueryKey();

  const query = useQuery({
    ...(deliveriesGetFulfillmentServicesQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
