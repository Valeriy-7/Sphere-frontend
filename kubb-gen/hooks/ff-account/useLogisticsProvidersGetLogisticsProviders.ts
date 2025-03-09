import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type { LogisticsProvidersGetLogisticsProvidersQueryResponseType } from '../../types/ff-account/LogisticsProvidersGetLogisticsProvidersType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const logisticsProvidersGetLogisticsProvidersQueryKey = () =>
  [{ url: '/ff-account/logistics-providers' }] as const;

export type LogisticsProvidersGetLogisticsProvidersQueryKey = ReturnType<
  typeof logisticsProvidersGetLogisticsProvidersQueryKey
>;

/**
 * @description Возвращает список всех логистов, доступных для текущего кабинета.
 * @summary Получить список логистов
 * {@link /ff-account/logistics-providers}
 */
export async function logisticsProvidersGetLogisticsProviders(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    LogisticsProvidersGetLogisticsProvidersQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/ff-account/logistics-providers`,
    ...requestConfig,
  });
  return res.data;
}

export function logisticsProvidersGetLogisticsProvidersQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = logisticsProvidersGetLogisticsProvidersQueryKey();
  return queryOptions<
    LogisticsProvidersGetLogisticsProvidersQueryResponseType,
    ResponseErrorConfig<Error>,
    LogisticsProvidersGetLogisticsProvidersQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return logisticsProvidersGetLogisticsProviders(config);
    },
  });
}

/**
 * @description Возвращает список всех логистов, доступных для текущего кабинета.
 * @summary Получить список логистов
 * {@link /ff-account/logistics-providers}
 */
export function useLogisticsProvidersGetLogisticsProviders<
  TData = LogisticsProvidersGetLogisticsProvidersQueryResponseType,
  TQueryData = LogisticsProvidersGetLogisticsProvidersQueryResponseType,
  TQueryKey extends QueryKey = LogisticsProvidersGetLogisticsProvidersQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        LogisticsProvidersGetLogisticsProvidersQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? logisticsProvidersGetLogisticsProvidersQueryKey();

  const query = useQuery({
    ...(logisticsProvidersGetLogisticsProvidersQueryOptions(
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
