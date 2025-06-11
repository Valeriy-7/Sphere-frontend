import client from '@/modules/auth/axios-client'
import type { TestFindOneQueryResponseType, TestFindOnePathParamsType } from '../../types/test/TestFindOneType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const testFindOneQueryKey = (id: TestFindOnePathParamsType['id']) => [{ url: '/test/:id', params: { id: id } }] as const

export type TestFindOneQueryKey = ReturnType<typeof testFindOneQueryKey>

/**
 * {@link /test/:id}
 */
export async function testFindOne(id: TestFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TestFindOneQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/test/${id}`, ...requestConfig })
  return res.data
}

export function testFindOneQueryOptions(id: TestFindOnePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = testFindOneQueryKey(id)
  return queryOptions<TestFindOneQueryResponseType, ResponseErrorConfig<Error>, TestFindOneQueryResponseType, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return testFindOne(id, config)
    },
  })
}

/**
 * {@link /test/:id}
 */
export function useTestFindOne<
  TData = TestFindOneQueryResponseType,
  TQueryData = TestFindOneQueryResponseType,
  TQueryKey extends QueryKey = TestFindOneQueryKey,
>(
  id: TestFindOnePathParamsType['id'],
  options: {
    query?: Partial<QueryObserverOptions<TestFindOneQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? testFindOneQueryKey(id)

  const query = useQuery({
    ...(testFindOneQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}