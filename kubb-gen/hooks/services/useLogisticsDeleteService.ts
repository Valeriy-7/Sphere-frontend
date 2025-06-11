import client from '@/modules/auth/axios-client'
import type { LogisticsDeleteServiceMutationResponseType, LogisticsDeleteServicePathParamsType } from '../../types/services/LogisticsDeleteServiceType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const logisticsDeleteServiceMutationKey = () => [{ url: '/services/service/{id}' }] as const

export type LogisticsDeleteServiceMutationKey = ReturnType<typeof logisticsDeleteServiceMutationKey>

/**
 * @summary Удаление услуги
 * {@link /services/service/:id}
 */
export async function logisticsDeleteService(id: LogisticsDeleteServicePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsDeleteServiceMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/services/service/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Удаление услуги
 * {@link /services/service/:id}
 */
export function useLogisticsDeleteService<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsDeleteServiceMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: LogisticsDeleteServicePathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsDeleteServiceMutationKey()

  return useMutation<LogisticsDeleteServiceMutationResponseType, ResponseErrorConfig<Error>, { id: LogisticsDeleteServicePathParamsType['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return logisticsDeleteService(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}