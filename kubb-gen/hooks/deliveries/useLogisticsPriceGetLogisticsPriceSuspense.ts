import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  LogisticsPriceGetLogisticsPriceQueryResponseType,
  LogisticsPriceGetLogisticsPriceQueryParamsType,
  LogisticsPriceGetLogisticsPrice404Type,
} from '../../types/deliveries/LogisticsPriceGetLogisticsPriceType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const logisticsPriceGetLogisticsPriceSuspenseQueryKey = (
  params: LogisticsPriceGetLogisticsPriceQueryParamsType,
) => [{ url: '/deliveries/logistics-price' }, ...(params ? [params] : [])] as const;

export type LogisticsPriceGetLogisticsPriceSuspenseQueryKey = ReturnType<
  typeof logisticsPriceGetLogisticsPriceSuspenseQueryKey
>;

/**
 * @description Возвращает информацию о цене логистики между указанными точками отправления и назначения. Цены берутся из настроек логистики, созданных фулфилмент-центрами, которые являются партнерами текущего кабинета.
 * @summary Получение цены логистики между двумя точками
 * {@link /deliveries/logistics-price}
 */
export async function logisticsPriceGetLogisticsPriceSuspense(
  params: LogisticsPriceGetLogisticsPriceQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    LogisticsPriceGetLogisticsPriceQueryResponseType,
    ResponseErrorConfig<LogisticsPriceGetLogisticsPrice404Type>,
    unknown
  >({
    method: 'GET',
    url: `/deliveries/logistics-price`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function logisticsPriceGetLogisticsPriceSuspenseQueryOptions(
  params: LogisticsPriceGetLogisticsPriceQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = logisticsPriceGetLogisticsPriceSuspenseQueryKey(params);
  return queryOptions<
    LogisticsPriceGetLogisticsPriceQueryResponseType,
    ResponseErrorConfig<LogisticsPriceGetLogisticsPrice404Type>,
    LogisticsPriceGetLogisticsPriceQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return logisticsPriceGetLogisticsPriceSuspense(params, config);
    },
  });
}

/**
 * @description Возвращает информацию о цене логистики между указанными точками отправления и назначения. Цены берутся из настроек логистики, созданных фулфилмент-центрами, которые являются партнерами текущего кабинета.
 * @summary Получение цены логистики между двумя точками
 * {@link /deliveries/logistics-price}
 */
export function useLogisticsPriceGetLogisticsPriceSuspense<
  TData = LogisticsPriceGetLogisticsPriceQueryResponseType,
  TQueryData = LogisticsPriceGetLogisticsPriceQueryResponseType,
  TQueryKey extends QueryKey = LogisticsPriceGetLogisticsPriceSuspenseQueryKey,
>(
  params: LogisticsPriceGetLogisticsPriceQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        LogisticsPriceGetLogisticsPriceQueryResponseType,
        ResponseErrorConfig<LogisticsPriceGetLogisticsPrice404Type>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? logisticsPriceGetLogisticsPriceSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(logisticsPriceGetLogisticsPriceSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<LogisticsPriceGetLogisticsPrice404Type>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
