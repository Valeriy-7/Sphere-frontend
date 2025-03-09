import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  LogisticsProvidersGetLogisticsProviderQueryResponseType,
  LogisticsProvidersGetLogisticsProviderPathParamsType,
  LogisticsProvidersGetLogisticsProvider404Type,
} from '../../types/ff-account/LogisticsProvidersGetLogisticsProviderType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const logisticsProvidersGetLogisticsProviderSuspenseQueryKey = (
  id: LogisticsProvidersGetLogisticsProviderPathParamsType['id'],
) => [{ url: '/ff-account/logistics-providers/:id', params: { id: id } }] as const;

export type LogisticsProvidersGetLogisticsProviderSuspenseQueryKey = ReturnType<
  typeof logisticsProvidersGetLogisticsProviderSuspenseQueryKey
>;

/**
 * @description Возвращает детальную информацию о конкретном логисте по его идентификатору.
 * @summary Получить информацию о логисте
 * {@link /ff-account/logistics-providers/:id}
 */
export async function logisticsProvidersGetLogisticsProviderSuspense(
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

export function logisticsProvidersGetLogisticsProviderSuspenseQueryOptions(
  id: LogisticsProvidersGetLogisticsProviderPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = logisticsProvidersGetLogisticsProviderSuspenseQueryKey(id);
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
      return logisticsProvidersGetLogisticsProviderSuspense(id, config);
    },
  });
}

/**
 * @description Возвращает детальную информацию о конкретном логисте по его идентификатору.
 * @summary Получить информацию о логисте
 * {@link /ff-account/logistics-providers/:id}
 */
export function useLogisticsProvidersGetLogisticsProviderSuspense<
  TData = LogisticsProvidersGetLogisticsProviderQueryResponseType,
  TQueryData = LogisticsProvidersGetLogisticsProviderQueryResponseType,
  TQueryKey extends QueryKey = LogisticsProvidersGetLogisticsProviderSuspenseQueryKey,
>(
  id: LogisticsProvidersGetLogisticsProviderPathParamsType['id'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        LogisticsProvidersGetLogisticsProviderQueryResponseType,
        ResponseErrorConfig<LogisticsProvidersGetLogisticsProvider404Type>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey =
    queryOptions?.queryKey ?? logisticsProvidersGetLogisticsProviderSuspenseQueryKey(id);

  const query = useSuspenseQuery({
    ...(logisticsProvidersGetLogisticsProviderSuspenseQueryOptions(
      id,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<LogisticsProvidersGetLogisticsProvider404Type>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
