import client from '@/modules/auth/axios-client'
import type { WorkersGetWorkersQueryResponseType } from '../../types/ff-account/WorkersGetWorkersType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const workersGetWorkersQueryKey = () => [{ url: '/ff-account/workers' }] as const

export type WorkersGetWorkersQueryKey = ReturnType<typeof workersGetWorkersQueryKey>

/**
 * @description Возвращает список всех сотрудников, доступных для текущего кабинета.
 * @summary Получить список сотрудников
 * {@link /ff-account/workers}
 */
export async function workersGetWorkers(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WorkersGetWorkersQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/workers`,
    ...requestConfig,
  })
  return res.data
}

export function workersGetWorkersQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = workersGetWorkersQueryKey()
  return queryOptions<WorkersGetWorkersQueryResponseType, ResponseErrorConfig<Error>, WorkersGetWorkersQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return workersGetWorkers(config)
    },
  })
}

/**
 * @description Возвращает список всех сотрудников, доступных для текущего кабинета.
 * @summary Получить список сотрудников
 * {@link /ff-account/workers}
 */
export function useWorkersGetWorkers<
  TData = WorkersGetWorkersQueryResponseType,
  TQueryData = WorkersGetWorkersQueryResponseType,
  TQueryKey extends QueryKey = WorkersGetWorkersQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<WorkersGetWorkersQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? workersGetWorkersQueryKey()

  const query = useQuery({
    ...(workersGetWorkersQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}