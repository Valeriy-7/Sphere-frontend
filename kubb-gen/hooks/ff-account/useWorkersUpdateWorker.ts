import client from '@/modules/auth/axios-client'
import type {
  WorkersUpdateWorkerMutationRequestType,
  WorkersUpdateWorkerMutationResponseType,
  WorkersUpdateWorkerPathParamsType,
  WorkersUpdateWorker404Type,
} from '../../types/ff-account/WorkersUpdateWorkerType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const workersUpdateWorkerMutationKey = () => [{ url: '/ff-account/workers/{workerId}' }] as const

export type WorkersUpdateWorkerMutationKey = ReturnType<typeof workersUpdateWorkerMutationKey>

/**
 * @description Обновляет информацию о существующем сотруднике. Можно обновить как все поля, так и отдельные.
 * @summary Обновить информацию о сотруднике
 * {@link /ff-account/workers/:workerId}
 */
export async function workersUpdateWorker(
  workerId: WorkersUpdateWorkerPathParamsType['workerId'],
  data?: WorkersUpdateWorkerMutationRequestType,
  config: Partial<RequestConfig<WorkersUpdateWorkerMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WorkersUpdateWorkerMutationResponseType, ResponseErrorConfig<WorkersUpdateWorker404Type>, WorkersUpdateWorkerMutationRequestType>({
    method: 'PATCH',
    url: `/ff-account/workers/${workerId}`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Обновляет информацию о существующем сотруднике. Можно обновить как все поля, так и отдельные.
 * @summary Обновить информацию о сотруднике
 * {@link /ff-account/workers/:workerId}
 */
export function useWorkersUpdateWorker<TContext>(
  options: {
    mutation?: UseMutationOptions<
      WorkersUpdateWorkerMutationResponseType,
      ResponseErrorConfig<WorkersUpdateWorker404Type>,
      { workerId: WorkersUpdateWorkerPathParamsType['workerId']; data?: WorkersUpdateWorkerMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<WorkersUpdateWorkerMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? workersUpdateWorkerMutationKey()

  return useMutation<
    WorkersUpdateWorkerMutationResponseType,
    ResponseErrorConfig<WorkersUpdateWorker404Type>,
    { workerId: WorkersUpdateWorkerPathParamsType['workerId']; data?: WorkersUpdateWorkerMutationRequestType },
    TContext
  >({
    mutationFn: async ({ workerId, data }) => {
      return workersUpdateWorker(workerId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}