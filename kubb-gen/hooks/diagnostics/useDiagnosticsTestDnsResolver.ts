import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type { DiagnosticsTestDnsResolverQueryResponseType } from '../../types/diagnostics/DiagnosticsTestDnsResolverType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const diagnosticsTestDnsResolverQueryKey = () => [{ url: '/diagnostics/dns-test' }] as const;

export type DiagnosticsTestDnsResolverQueryKey = ReturnType<
  typeof diagnosticsTestDnsResolverQueryKey
>;

/**
 * @description Проверяет DNS-резолвинг для доменов API Wildberries
 * @summary Проверка DNS-резолвинга
 * {@link /diagnostics/dns-test}
 */
export async function diagnosticsTestDnsResolver(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DiagnosticsTestDnsResolverQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/diagnostics/dns-test`,
    ...requestConfig,
  });
  return res.data;
}

export function diagnosticsTestDnsResolverQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = diagnosticsTestDnsResolverQueryKey();
  return queryOptions<
    DiagnosticsTestDnsResolverQueryResponseType,
    ResponseErrorConfig<Error>,
    DiagnosticsTestDnsResolverQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return diagnosticsTestDnsResolver(config);
    },
  });
}

/**
 * @description Проверяет DNS-резолвинг для доменов API Wildberries
 * @summary Проверка DNS-резолвинга
 * {@link /diagnostics/dns-test}
 */
export function useDiagnosticsTestDnsResolver<
  TData = DiagnosticsTestDnsResolverQueryResponseType,
  TQueryData = DiagnosticsTestDnsResolverQueryResponseType,
  TQueryKey extends QueryKey = DiagnosticsTestDnsResolverQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        DiagnosticsTestDnsResolverQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? diagnosticsTestDnsResolverQueryKey();

  const query = useQuery({
    ...(diagnosticsTestDnsResolverQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
