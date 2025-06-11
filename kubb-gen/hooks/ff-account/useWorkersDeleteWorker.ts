import client from '@/modules/auth/axios-client'
import type {
  WorkersDeleteWorkerMutationResponseType,
  WorkersDeleteWorkerPathParamsType,
  WorkersDeleteWorker404Type,
} from '../../types/ff-account/WorkersDeleteWorkerType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const workersDeleteWorkerMutationKey = () => [{ url: '/ff-account/workers/{workerId}' }] as const

export type WorkersDeleteWorkerMutationKey = ReturnType<typeof workersDeleteWorkerMutationKey>

/**
 * @description Удаляет сотрудника по его идентификатору.
 * @summary Удалить сотрудника
 * {@link /ff-account/workers/:workerId}
 */
export async function workersDeleteWorker(
  workerId: WorkersDeleteWorkerPathParamsType['workerId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WorkersDeleteWorkerMutationResponseType, ResponseErrorConfig<WorkersDeleteWorker404Type>, unknown>({
    method: 'DELETE',
    url: `/ff-account/workers/${workerId}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Удаляет сотрудника по его идентификатору.
 * @summary Удалить сотрудника
 * {@link /ff-account/workers/:workerId}
 */
export function useWorkersDeleteWorker<TContext>(
  options: {
    mutation?: UseMutationOptions<
      WorkersDeleteWorkerMutationResponseType,
      ResponseErrorConfig<WorkersDeleteWorker404Type>,
      { workerId: WorkersDeleteWorkerPathParamsType['workerId'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? workersDeleteWorkerMutationKey()

  return useMutation<
    WorkersDeleteWorkerMutationResponseType,
    ResponseErrorConfig<WorkersDeleteWorker404Type>,
    { workerId: WorkersDeleteWorkerPathParamsType['workerId'] },
    TContext
  >({
    mutationFn: async ({ workerId }) => {
      return workersDeleteWorker(workerId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}