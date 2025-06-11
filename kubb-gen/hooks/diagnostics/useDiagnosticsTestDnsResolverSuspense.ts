import client from '@/modules/auth/axios-client'
import type { DiagnosticsTestDnsResolverQueryResponseType } from '../../types/diagnostics/DiagnosticsTestDnsResolverType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const diagnosticsTestDnsResolverSuspenseQueryKey = () => [{ url: '/diagnostics/dns-test' }] as const

export type DiagnosticsTestDnsResolverSuspenseQueryKey = ReturnType<typeof diagnosticsTestDnsResolverSuspenseQueryKey>

/**
 * @description Проверяет DNS-резолвинг для доменов API Wildberries
 * @summary Проверка DNS-резолвинга
 * {@link /diagnostics/dns-test}
 */
export async function diagnosticsTestDnsResolverSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DiagnosticsTestDnsResolverQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/diagnostics/dns-test`,
    ...requestConfig,
  })
  return res.data
}

export function diagnosticsTestDnsResolverSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = diagnosticsTestDnsResolverSuspenseQueryKey()
  return queryOptions<DiagnosticsTestDnsResolverQueryResponseType, ResponseErrorConfig<Error>, DiagnosticsTestDnsResolverQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return diagnosticsTestDnsResolverSuspense(config)
    },
  })
}

/**
 * @description Проверяет DNS-резолвинг для доменов API Wildberries
 * @summary Проверка DNS-резолвинга
 * {@link /diagnostics/dns-test}
 */
export function useDiagnosticsTestDnsResolverSuspense<
  TData = DiagnosticsTestDnsResolverQueryResponseType,
  TQueryData = DiagnosticsTestDnsResolverQueryResponseType,
  TQueryKey extends QueryKey = DiagnosticsTestDnsResolverSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<DiagnosticsTestDnsResolverQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? diagnosticsTestDnsResolverSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(diagnosticsTestDnsResolverSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}