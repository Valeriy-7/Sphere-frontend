import client from '@/modules/auth/axios-client'
import type { WorkersGetWorkersQueryResponseType } from '../../types/ff-account/WorkersGetWorkersType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const workersGetWorkersSuspenseQueryKey = () => [{ url: '/ff-account/workers' }] as const

export type WorkersGetWorkersSuspenseQueryKey = ReturnType<typeof workersGetWorkersSuspenseQueryKey>

/**
 * @description Возвращает список всех сотрудников, доступных для текущего кабинета.
 * @summary Получить список сотрудников
 * {@link /ff-account/workers}
 */
export async function workersGetWorkersSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WorkersGetWorkersQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/workers`,
    ...requestConfig,
  })
  return res.data
}

export function workersGetWorkersSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = workersGetWorkersSuspenseQueryKey()
  return queryOptions<WorkersGetWorkersQueryResponseType, ResponseErrorConfig<Error>, WorkersGetWorkersQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return workersGetWorkersSuspense(config)
    },
  })
}

/**
 * @description Возвращает список всех сотрудников, доступных для текущего кабинета.
 * @summary Получить список сотрудников
 * {@link /ff-account/workers}
 */
export function useWorkersGetWorkersSuspense<
  TData = WorkersGetWorkersQueryResponseType,
  TQueryData = WorkersGetWorkersQueryResponseType,
  TQueryKey extends QueryKey = WorkersGetWorkersSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<WorkersGetWorkersQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? workersGetWorkersSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(workersGetWorkersSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}