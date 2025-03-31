import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { LogisticsDeleteLogisticsMutationResponseType, LogisticsDeleteLogisticsPathParamsType } from '../../types/services/LogisticsDeleteLogisticsType'
import { useMutation } from '@tanstack/react-query'

export const logisticsDeleteLogisticsMutationKey = () => [{ url: '/services/logistics/{id}' }] as const

export type LogisticsDeleteLogisticsMutationKey = ReturnType<typeof logisticsDeleteLogisticsMutationKey>

/**
 * @summary Удаление логистики
 * {@link /services/logistics/:id}
 */
export async function logisticsDeleteLogistics(
  id: LogisticsDeleteLogisticsPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsDeleteLogisticsMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/services/logistics/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Удаление логистики
 * {@link /services/logistics/:id}
 */
export function useLogisticsDeleteLogistics<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsDeleteLogisticsMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: LogisticsDeleteLogisticsPathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsDeleteLogisticsMutationKey()

  return useMutation<LogisticsDeleteLogisticsMutationResponseType, ResponseErrorConfig<Error>, { id: LogisticsDeleteLogisticsPathParamsType['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return logisticsDeleteLogistics(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}