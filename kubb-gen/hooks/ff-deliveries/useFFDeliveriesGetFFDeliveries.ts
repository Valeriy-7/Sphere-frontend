import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  FFDeliveriesGetFFDeliveriesQueryResponseType,
  FFDeliveriesGetFFDeliveriesQueryParamsType,
  FFDeliveriesGetFFDeliveries401Type,
} from '../../types/ff-deliveries/FFDeliveriesGetFFDeliveriesType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const FFDeliveriesGetFFDeliveriesQueryKey = (
  params?: FFDeliveriesGetFFDeliveriesQueryParamsType,
) => [{ url: '/ff-deliveries' }, ...(params ? [params] : [])] as const;

export type FFDeliveriesGetFFDeliveriesQueryKey = ReturnType<
  typeof FFDeliveriesGetFFDeliveriesQueryKey
>;

/**
 * @description Возвращает список поставок на ФФ с возможностью фильтрации по статусу и периоду дат. Также включает информацию о маршрутах, поставщиках и общую статистику.
 * @summary Получить список поставок на ФФ
 * {@link /ff-deliveries}
 */
export async function FFDeliveriesGetFFDeliveries(
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

export function FFDeliveriesGetFFDeliveriesQueryOptions(
  params?: FFDeliveriesGetFFDeliveriesQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFDeliveriesGetFFDeliveriesQueryKey(params);
  return queryOptions<
    FFDeliveriesGetFFDeliveriesQueryResponseType,
    ResponseErrorConfig<FFDeliveriesGetFFDeliveries401Type>,
    FFDeliveriesGetFFDeliveriesQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return FFDeliveriesGetFFDeliveries(params, config);
    },
  });
}

/**
 * @description Возвращает список поставок на ФФ с возможностью фильтрации по статусу и периоду дат. Также включает информацию о маршрутах, поставщиках и общую статистику.
 * @summary Получить список поставок на ФФ
 * {@link /ff-deliveries}
 */
export function useFFDeliveriesGetFFDeliveries<
  TData = FFDeliveriesGetFFDeliveriesQueryResponseType,
  TQueryData = FFDeliveriesGetFFDeliveriesQueryResponseType,
  TQueryKey extends QueryKey = FFDeliveriesGetFFDeliveriesQueryKey,
>(
  params?: FFDeliveriesGetFFDeliveriesQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        FFDeliveriesGetFFDeliveriesQueryResponseType,
        ResponseErrorConfig<FFDeliveriesGetFFDeliveries401Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? FFDeliveriesGetFFDeliveriesQueryKey(params);

  const query = useQuery({
    ...(FFDeliveriesGetFFDeliveriesQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<FFDeliveriesGetFFDeliveries401Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
