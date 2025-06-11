import client from '@/modules/auth/axios-client'
import type { WorkersGetWorkerQueryResponseType, WorkersGetWorkerPathParamsType, WorkersGetWorker404Type } from '../../types/ff-account/WorkersGetWorkerType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const workersGetWorkerQueryKey = (workerId: WorkersGetWorkerPathParamsType['workerId']) =>
  [{ url: '/ff-account/workers/:workerId', params: { workerId: workerId } }] as const

export type WorkersGetWorkerQueryKey = ReturnType<typeof workersGetWorkerQueryKey>

/**
 * @description Возвращает детальную информацию о конкретном сотруднике по его идентификатору.
 * @summary Получить информацию о сотруднике
 * {@link /ff-account/workers/:workerId}
 */
export async function workersGetWorker(workerId: WorkersGetWorkerPathParamsType['workerId'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WorkersGetWorkerQueryResponseType, ResponseErrorConfig<WorkersGetWorker404Type>, unknown>({
    method: 'GET',
    url: `/ff-account/workers/${workerId}`,
    ...requestConfig,
  })
  return res.data
}

export function workersGetWorkerQueryOptions(
  workerId: WorkersGetWorkerPathParamsType['workerId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = workersGetWorkerQueryKey(workerId)
  return queryOptions<WorkersGetWorkerQueryResponseType, ResponseErrorConfig<WorkersGetWorker404Type>, WorkersGetWorkerQueryResponseType, typeof queryKey>({
    enabled: !!workerId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return workersGetWorker(workerId, config)
    },
  })
}

/**
 * @description Возвращает детальную информацию о конкретном сотруднике по его идентификатору.
 * @summary Получить информацию о сотруднике
 * {@link /ff-account/workers/:workerId}
 */
export function useWorkersGetWorker<
  TData = WorkersGetWorkerQueryResponseType,
  TQueryData = WorkersGetWorkerQueryResponseType,
  TQueryKey extends QueryKey = WorkersGetWorkerQueryKey,
>(
  workerId: WorkersGetWorkerPathParamsType['workerId'],
  options: {
    query?: Partial<QueryObserverOptions<WorkersGetWorkerQueryResponseType, ResponseErrorConfig<WorkersGetWorker404Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? workersGetWorkerQueryKey(workerId)

  const query = useQuery({
    ...(workersGetWorkerQueryOptions(workerId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<WorkersGetWorker404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}