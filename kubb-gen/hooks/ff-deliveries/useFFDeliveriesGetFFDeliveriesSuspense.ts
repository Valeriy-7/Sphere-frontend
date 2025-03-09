import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  FFDeliveriesGetFFDeliveriesQueryResponseType,
  FFDeliveriesGetFFDeliveriesQueryParamsType,
  FFDeliveriesGetFFDeliveries401Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFDeliveriesType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const FFDeliveriesGetFFDeliveriesSuspenseQueryKey = (
  params?: FFDeliveriesGetFFDeliveriesQueryParamsType,
) => [{ url: '/ff-deliveries' }, ...(params ? [params] : [])] as const;

export type FFDeliveriesGetFFDeliveriesSuspenseQueryKey = ReturnType<
  typeof FFDeliveriesGetFFDeliveriesSuspenseQueryKey
>;

/**
 * @description Возвращает список поставок на ФФ с суммарной информацией и возможностью фильтрации по статусу и датам
 * @summary Получить список поставок на ФФ
 * {@link /ff-deliveries}
 */
export async function FFDeliveriesGetFFDeliveriesSuspense(
  params?: FFDeliveriesGetFFDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFDeliveriesGetFFDeliveriesQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFDeliveries401Type>,
    unknown
  >({
    method: 'GET',
    url: `/ff-deliveries`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function FFDeliveriesGetFFDeliveriesSuspenseQueryOptions(
  params?: FFDeliveriesGetFFDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFDeliveriesSuspenseQueryKey(params);
  return queryOptions<
    FFDeliveriesGetFFDeliveriesQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFDeliveries401Type>,
    FFDeliveriesGetFFDeliveriesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return FFDeliveriesGetFFDeliveriesSuspense(params, config);
    },
  });
}

/**
 * @description Возвращает список поставок на ФФ с суммарной информацией и возможностью фильтрации по статусу и датам
 * @summary Получить список поставок на ФФ
 * {@link /ff-deliveries}
 */
export function useFFDeliveriesGetFFDeliveriesSuspense<
  TData = FFDeliveriesGetFFDeliveriesQueryResponseType,
  TQueryData = FFDeliveriesGetFFDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFDeliveriesSuspenseQueryKey,
>(
  params?: FFDeliveriesGetFFDeliveriesQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFDeliveriesGetFFDeliveriesQueryResponseType,
        ResponseErrorConfig<FFDeliveriesGetFFDeliveries401Type>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? FFDeliveriesGetFFDeliveriesSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(FFDeliveriesGetFFDeliveriesSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FFDeliveriesGetFFDeliveries401Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
