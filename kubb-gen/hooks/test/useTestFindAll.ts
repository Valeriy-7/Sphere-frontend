import client from '@/modules/auth/axios-client'
import type { TestFindAllQueryResponseType } from '../../types/test/TestFindAllType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const testFindAllQueryKey = () => [{ url: '/test' }] as const

export type TestFindAllQueryKey = ReturnType<typeof testFindAllQueryKey>

/**
 * {@link /test}
 */
export async function testFindAll(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TestFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/test`, ...requestConfig })
  return res.data
}

export function testFindAllQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = testFindAllQueryKey()
  return queryOptions<TestFindAllQueryResponseType, ResponseErrorConfig<Error>, TestFindAllQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return testFindAll(config)
    },
  })
}

/**
 * {@link /test}
 */
export function useTestFindAll<
  TData = TestFindAllQueryResponseType,
  TQueryData = TestFindAllQueryResponseType,
  TQueryKey extends QueryKey = TestFindAllQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<TestFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? testFindAllQueryKey()

  const query = useQuery({
    ...(testFindAllQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}