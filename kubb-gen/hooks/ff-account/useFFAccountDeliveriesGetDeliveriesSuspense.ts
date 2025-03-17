import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  FFAccountDeliveriesGetDeliveriesQueryResponseType,
  FFAccountDeliveriesGetDeliveriesQueryParamsType,
} from '../../types/ff-account/FFAccountDeliveriesGetDeliveriesType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const FFAccountDeliveriesGetDeliveriesSuspenseQueryKey = (
  params?: FFAccountDeliveriesGetDeliveriesQueryParamsType,
) => [{ url: '/ff-account/deliveries' }, ...(params ? [params] : [])] as const;

export type FFAccountDeliveriesGetDeliveriesSuspenseQueryKey = ReturnType<
  typeof FFAccountDeliveriesGetDeliveriesSuspenseQueryKey
>;

/**
 * @description Возвращает список поставок с возможностью фильтрации по статусу и периоду дат. Также включает информацию о маршрутах, поставщиках и общую статистику.
 * @summary Получить список поставок
 * {@link /ff-account/deliveries}
 */
export async function FFAccountDeliveriesGetDeliveriesSuspense(
  params?: FFAccountDeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFAccountDeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/ff-account/deliveries`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function FFAccountDeliveriesGetDeliveriesSuspenseQueryOptions(
  params?: FFAccountDeliveriesGetDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFAccountDeliveriesGetDeliveriesSuspenseQueryKey(params);
  return queryOptions<
    FFAccountDeliveriesGetDeliveriesQueryResponseType,
    ResponseErrorConfig<Error>,
    FFAccountDeliveriesGetDeliveriesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return FFAccountDeliveriesGetDeliveriesSuspense(params, config);
    },
  });
}

/**
 * @description Возвращает список поставок с возможностью фильтрации по статусу и периоду дат. Также включает информацию о маршрутах, поставщиках и общую статистику.
 * @summary Получить список поставок
 * {@link /ff-account/deliveries}
 */
export function useFFAccountDeliveriesGetDeliveriesSuspense<
  TData = FFAccountDeliveriesGetDeliveriesQueryResponseType,
  TQueryData = FFAccountDeliveriesGetDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetDeliveriesSuspenseQueryKey,
>(
  params?: FFAccountDeliveriesGetDeliveriesQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFAccountDeliveriesGetDeliveriesQueryResponseType,
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
    queryOptions?.queryKey ?? FFAccountDeliveriesGetDeliveriesSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(FFAccountDeliveriesGetDeliveriesSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
