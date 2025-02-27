import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  DeliveriesGetFulfillmentServicesQueryResponseType,
  DeliveriesGetFulfillmentServices401Type,
  DeliveriesGetFulfillmentServices404Type,
} from '../../types/deliveries/DeliveriesGetFulfillmentServicesType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const deliveriesGetFulfillmentServicesSuspenseQueryKey = () =>
  [{ url: '/deliveries/ff-services' }] as const;

export type DeliveriesGetFulfillmentServicesSuspenseQueryKey = ReturnType<
  typeof deliveriesGetFulfillmentServicesSuspenseQueryKey
>;

/**
 * @description Возвращает список всех доступных услуг от привязанного фулфилмент кабинета
 * @summary Получение списка услуг фулфилмента
 * {@link /deliveries/ff-services}
 */
export async function deliveriesGetFulfillmentServicesSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesGetFulfillmentServicesQueryResponseType,
    ResponseErrorConfig<
      DeliveriesGetFulfillmentServices401Type | DeliveriesGetFulfillmentServices404Type
    >,
    unknown
  >({ method: 'GET', url: `/deliveries/ff-services`, ...requestConfig });
  return res.data;
}

export function deliveriesGetFulfillmentServicesSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetFulfillmentServicesSuspenseQueryKey();
  return queryOptions<
    DeliveriesGetFulfillmentServicesQueryResponseType,
    ResponseErrorConfig<
      DeliveriesGetFulfillmentServices401Type | DeliveriesGetFulfillmentServices404Type
    >,
    DeliveriesGetFulfillmentServicesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetFulfillmentServicesSuspense(config);
    },
  });
}

/**
 * @description Возвращает список всех доступных услуг от привязанного фулфилмент кабинета
 * @summary Получение списка услуг фулфилмента
 * {@link /deliveries/ff-services}
 */
export function useDeliveriesGetFulfillmentServicesSuspense<
  TData = DeliveriesGetFulfillmentServicesQueryResponseType,
  TQueryData = DeliveriesGetFulfillmentServicesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetFulfillmentServicesSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveriesGetFulfillmentServicesQueryResponseType,
        ResponseErrorConfig<
          DeliveriesGetFulfillmentServices401Type | DeliveriesGetFulfillmentServices404Type
        >,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveriesGetFulfillmentServicesSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(deliveriesGetFulfillmentServicesSuspenseQueryOptions(
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<
      DeliveriesGetFulfillmentServices401Type | DeliveriesGetFulfillmentServices404Type
    >
  > & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
