import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  DeliveriesGetDeliveriesQueryResponseType,
  DeliveriesGetDeliveries401Type,
} from '../../types/deliveries/DeliveriesGetDeliveriesType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const deliveriesGetDeliveriesSuspenseQueryKey = () => [{ url: '/deliveries' }] as const;

export type DeliveriesGetDeliveriesSuspenseQueryKey = ReturnType<
  typeof deliveriesGetDeliveriesSuspenseQueryKey
>;

/**
 * @description Возвращает список всех поставок текущего кабинета
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export async function deliveriesGetDeliveriesSuspense(
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

export function deliveriesGetDeliveriesSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetDeliveriesSuspenseQueryKey();
  return queryOptions<
    DeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<DeliveriesGetDeliveries401Type>,
    DeliveriesGetDeliveriesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetDeliveriesSuspense(config);
    },
  });
}

/**
 * @description Возвращает список всех поставок текущего кабинета
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export function useDeliveriesGetDeliveriesSuspense<
  TData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetDeliveriesSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveriesGetDeliveriesQueryResponseType,
        ResponseErrorConfig<DeliveriesGetDeliveries401Type>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveriesGetDeliveriesSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(deliveriesGetDeliveriesSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<DeliveriesGetDeliveries401Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
