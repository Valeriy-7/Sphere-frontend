import client from '@/modules/auth/axios-client'
import type { WorkersCreateWorkerMutationRequestType, WorkersCreateWorkerMutationResponseType } from '../../types/ff-account/WorkersCreateWorkerType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const workersCreateWorkerMutationKey = () => [{ url: '/ff-account/workers' }] as const

export type WorkersCreateWorkerMutationKey = ReturnType<typeof workersCreateWorkerMutationKey>

/**
 * @description Создает нового сотрудника с указанными данными.
 * @summary Создать нового сотрудника
 * {@link /ff-account/workers}
 */
export async function workersCreateWorker(
  data: WorkersCreateWorkerMutationRequestType,
  config: Partial<RequestConfig<WorkersCreateWorkerMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WorkersCreateWorkerMutationResponseType, ResponseErrorConfig<Error>, WorkersCreateWorkerMutationRequestType>({
    method: 'POST',
    url: `/ff-account/workers`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Создает нового сотрудника с указанными данными.
 * @summary Создать нового сотрудника
 * {@link /ff-account/workers}
 */
export function useWorkersCreateWorker<TContext>(
  options: {
    mutation?: UseMutationOptions<
      WorkersCreateWorkerMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: WorkersCreateWorkerMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<WorkersCreateWorkerMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? workersCreateWorkerMutationKey()

  return useMutation<WorkersCreateWorkerMutationResponseType, ResponseErrorConfig<Error>, { data: WorkersCreateWorkerMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return workersCreateWorker(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}