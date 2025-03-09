import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  LogisticsProvidersGetLogisticsProviderQueryResponseType,
  LogisticsProvidersGetLogisticsProviderPathParamsType,
  LogisticsProvidersGetLogisticsProvider404Type,
} from '../../types/ff-account/LogisticsProvidersGetLogisticsProviderType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const logisticsProvidersGetLogisticsProviderQueryKey = (
  id: LogisticsProvidersGetLogisticsProviderPathParamsType['id'],
) => [{ url: '/ff-account/logistics-providers/:id', params: { id: id } }] as const;

export type LogisticsProvidersGetLogisticsProviderQueryKey = ReturnType<
  typeof logisticsProvidersGetLogisticsProviderQueryKey
>;

/**
 * @description Возвращает детальную информацию о конкретном логисте по его идентификатору.
 * @summary Получить информацию о логисте
 * {@link /ff-account/logistics-providers/:id}
 */
export async function logisticsProvidersGetLogisticsProvider(
  id: LogisticsProvidersGetLogisticsProviderPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    LogisticsProvidersGetLogisticsProviderQueryResponseType,
    ResponseErrorConfig<LogisticsProvidersGetLogisticsProvider404Type>,
    unknown
  >({ method: 'GET', url: `/ff-account/logistics-providers/${id}`, ...requestConfig });
  return res.data;
}

export function logisticsProvidersGetLogisticsProviderQueryOptions(
  id: LogisticsProvidersGetLogisticsProviderPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = logisticsProvidersGetLogisticsProviderQueryKey(id);
  return queryOptions<
    LogisticsProvidersGetLogisticsProviderQueryResponseType,
    ResponseErrorConfig<LogisticsProvidersGetLogisticsProvider404Type>,
    LogisticsProvidersGetLogisticsProviderQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return logisticsProvidersGetLogisticsProvider(id, config);
    },
  });
}

/**
 * @description Возвращает детальную информацию о конкретном логисте по его идентификатору.
 * @summary Получить информацию о логисте
 * {@link /ff-account/logistics-providers/:id}
 */
export function useLogisticsProvidersGetLogisticsProvider<
  TData = LogisticsProvidersGetLogisticsProviderQueryResponseType,
  TQueryData = LogisticsProvidersGetLogisticsProviderQueryResponseType,
  TQueryKey extends QueryKey = LogisticsProvidersGetLogisticsProviderQueryKey,
>(
  id: LogisticsProvidersGetLogisticsProviderPathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        LogisticsProvidersGetLogisticsProviderQueryResponseType,
        ResponseErrorConfig<LogisticsProvidersGetLogisticsProvider404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? logisticsProvidersGetLogisticsProviderQueryKey(id);

  const query = useQuery({
    ...(logisticsProvidersGetLogisticsProviderQueryOptions(
      id,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<
    TData,
    ResponseErrorConfig<LogisticsProvidersGetLogisticsProvider404Type>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
