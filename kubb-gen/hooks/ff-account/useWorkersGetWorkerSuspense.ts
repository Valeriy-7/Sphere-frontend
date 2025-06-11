import client from '@/modules/auth/axios-client'
import type { WorkersGetWorkerQueryResponseType, WorkersGetWorkerPathParamsType, WorkersGetWorker404Type } from '../../types/ff-account/WorkersGetWorkerType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const workersGetWorkerSuspenseQueryKey = (workerId: WorkersGetWorkerPathParamsType['workerId']) =>
  [{ url: '/ff-account/workers/:workerId', params: { workerId: workerId } }] as const

export type WorkersGetWorkerSuspenseQueryKey = ReturnType<typeof workersGetWorkerSuspenseQueryKey>

/**
 * @description Возвращает детальную информацию о конкретном сотруднике по его идентификатору.
 * @summary Получить информацию о сотруднике
 * {@link /ff-account/workers/:workerId}
 */
export async function workersGetWorkerSuspense(
  workerId: WorkersGetWorkerPathParamsType['workerId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WorkersGetWorkerQueryResponseType, ResponseErrorConfig<WorkersGetWorker404Type>, unknown>({
    method: 'GET',
    url: `/ff-account/workers/${workerId}`,
    ...requestConfig,
  })
  return res.data
}

export function workersGetWorkerSuspenseQueryOptions(
  workerId: WorkersGetWorkerPathParamsType['workerId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = workersGetWorkerSuspenseQueryKey(workerId)
  return queryOptions<WorkersGetWorkerQueryResponseType, ResponseErrorConfig<WorkersGetWorker404Type>, WorkersGetWorkerQueryResponseType, typeof queryKey>({
    enabled: !!workerId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return workersGetWorkerSuspense(workerId, config)
    },
  })
}

/**
 * @description Возвращает детальную информацию о конкретном сотруднике по его идентификатору.
 * @summary Получить информацию о сотруднике
 * {@link /ff-account/workers/:workerId}
 */
export function useWorkersGetWorkerSuspense<
  TData = WorkersGetWorkerQueryResponseType,
  TQueryData = WorkersGetWorkerQueryResponseType,
  TQueryKey extends QueryKey = WorkersGetWorkerSuspenseQueryKey,
>(
  workerId: WorkersGetWorkerPathParamsType['workerId'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<WorkersGetWorkerQueryResponseType, ResponseErrorConfig<WorkersGetWorker404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? workersGetWorkerSuspenseQueryKey(workerId)

  const query = useSuspenseQuery({
    ...(workersGetWorkerSuspenseQueryOptions(workerId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<WorkersGetWorker404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}