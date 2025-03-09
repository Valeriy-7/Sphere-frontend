import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  LogisticsPriceGetLogisticsPriceQueryResponseType,
  LogisticsPriceGetLogisticsPriceQueryParamsType,
  LogisticsPriceGetLogisticsPrice404Type,
} from '../../types/logistics-calculator/LogisticsPriceGetLogisticsPriceType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const logisticsPriceGetLogisticsPriceQueryKey = (
  params: LogisticsPriceGetLogisticsPriceQueryParamsType,
) => [{ url: '/logistics-calculator/price' }, ...(params ? [params] : [])] as const;

export type LogisticsPriceGetLogisticsPriceQueryKey = ReturnType<
  typeof logisticsPriceGetLogisticsPriceQueryKey
>;

/**
 * @description Возвращает информацию о цене логистики между указанными точками отправления и назначения. Цены берутся из настроек логистики, созданных фулфилмент-центрами, которые являются партнерами текущего кабинета.
 * @summary Получение цены логистики между двумя точками
 * {@link /logistics-calculator/price}
 */
export async function logisticsPriceGetLogisticsPrice(
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
    url: `/logistics-calculator/price`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function logisticsPriceGetLogisticsPriceQueryOptions(
  params: LogisticsPriceGetLogisticsPriceQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = logisticsPriceGetLogisticsPriceQueryKey(params);
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
      return logisticsPriceGetLogisticsPrice(params, config);
    },
  });
}

/**
 * @description Возвращает информацию о цене логистики между указанными точками отправления и назначения. Цены берутся из настроек логистики, созданных фулфилмент-центрами, которые являются партнерами текущего кабинета.
 * @summary Получение цены логистики между двумя точками
 * {@link /logistics-calculator/price}
 */
export function useLogisticsPriceGetLogisticsPrice<
  TData = LogisticsPriceGetLogisticsPriceQueryResponseType,
  TQueryData = LogisticsPriceGetLogisticsPriceQueryResponseType,
  TQueryKey extends QueryKey = LogisticsPriceGetLogisticsPriceQueryKey,
>(
  params: LogisticsPriceGetLogisticsPriceQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        LogisticsPriceGetLogisticsPriceQueryResponseType,
        ResponseErrorConfig<LogisticsPriceGetLogisticsPrice404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? logisticsPriceGetLogisticsPriceQueryKey(params);

  const query = useQuery({
    ...(logisticsPriceGetLogisticsPriceQueryOptions(
      params,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<LogisticsPriceGetLogisticsPrice404Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
