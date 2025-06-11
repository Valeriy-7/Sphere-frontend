import client from '@/modules/auth/axios-client'
import type { TestFindOneQueryResponseType, TestFindOnePathParamsType } from '../../types/test/TestFindOneType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const testFindOneSuspenseQueryKey = (id: TestFindOnePathParamsType['id']) => [{ url: '/test/:id', params: { id: id } }] as const

export type TestFindOneSuspenseQueryKey = ReturnType<typeof testFindOneSuspenseQueryKey>

/**
 * {@link /test/:id}
 */
export async function testFindOneSuspense(id: TestFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TestFindOneQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/test/${id}`, ...requestConfig })
  return res.data
}

export function testFindOneSuspenseQueryOptions(id: TestFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = testFindOneSuspenseQueryKey(id)
  return queryOptions<TestFindOneQueryResponseType, ResponseErrorConfig<Error>, TestFindOneQueryResponseType, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return testFindOneSuspense(id, config)
    },
  })
}

/**
 * {@link /test/:id}
 */
export function useTestFindOneSuspense<
  TData = TestFindOneQueryResponseType,
  TQueryData = TestFindOneQueryResponseType,
  TQueryKey extends QueryKey = TestFindOneSuspenseQueryKey,
>(
  id: TestFindOnePathParamsType['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<TestFindOneQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? testFindOneSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(testFindOneSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}