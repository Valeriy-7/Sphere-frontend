import client from '@/modules/auth/axios-client'
import type { TestFindAllQueryResponseType } from '../../types/test/TestFindAllType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const testFindAllSuspenseQueryKey = () => [{ url: '/test' }] as const

export type TestFindAllSuspenseQueryKey = ReturnType<typeof testFindAllSuspenseQueryKey>

/**
 * {@link /test}
 */
export async function testFindAllSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TestFindAllQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/test`, ...requestConfig })
  return res.data
}

export function testFindAllSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = testFindAllSuspenseQueryKey()
  return queryOptions<TestFindAllQueryResponseType, ResponseErrorConfig<Error>, TestFindAllQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return testFindAllSuspense(config)
    },
  })
}

/**
 * {@link /test}
 */
export function useTestFindAllSuspense<
  TData = TestFindAllQueryResponseType,
  TQueryData = TestFindAllQueryResponseType,
  TQueryKey extends QueryKey = TestFindAllSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<TestFindAllQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? testFindAllSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(testFindAllSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}