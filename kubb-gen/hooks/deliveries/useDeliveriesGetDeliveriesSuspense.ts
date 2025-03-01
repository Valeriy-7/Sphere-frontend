import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  DeliveriesGetDeliveriesQueryResponseType,
  DeliveriesGetDeliveriesQueryParamsType,
} from '../../types/deliveries/DeliveriesGetDeliveriesType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const deliveriesGetDeliveriesSuspenseQueryKey = (
  params?: DeliveriesGetDeliveriesQueryParamsType,
) => [{ url: '/deliveries' }, ...(params ? [params] : [])] as const;

export type DeliveriesGetDeliveriesSuspenseQueryKey = ReturnType<
  typeof deliveriesGetDeliveriesSuspenseQueryKey
>;

/**
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export async function deliveriesGetDeliveriesSuspense(
  params?: DeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/deliveries`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function deliveriesGetDeliveriesSuspenseQueryOptions(
  params?: DeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetDeliveriesSuspenseQueryKey(params);
  return queryOptions<
    DeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<Error>,
    DeliveriesGetDeliveriesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetDeliveriesSuspense(params, config);
    },
  });
}

/**
 * @summary Получение списка поставок
 * {@link /deliveries}
 */
export function useDeliveriesGetDeliveriesSuspense<
  TData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryData = DeliveriesGetDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetDeliveriesSuspenseQueryKey,
>(
  params?: DeliveriesGetDeliveriesQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveriesGetDeliveriesQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveriesGetDeliveriesSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(deliveriesGetDeliveriesSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
