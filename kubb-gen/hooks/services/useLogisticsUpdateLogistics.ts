import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  LogisticsUpdateLogisticsMutationRequestType,
  LogisticsUpdateLogisticsMutationResponseType,
  LogisticsUpdateLogisticsPathParamsType,
} from '../../types/services/LogisticsUpdateLogisticsType'
import { useMutation } from '@tanstack/react-query'

export const logisticsUpdateLogisticsMutationKey = () => [{ url: '/services/logistics/{id}' }] as const

export type LogisticsUpdateLogisticsMutationKey = ReturnType<typeof logisticsUpdateLogisticsMutationKey>

/**
 * @description Обновляет существующую запись логистики, включая описание маршрута
 * @summary Обновление логистики
 * {@link /services/logistics/:id}
 */
export async function logisticsUpdateLogistics(
  id: LogisticsUpdateLogisticsPathParamsType['id'],
  data: LogisticsUpdateLogisticsMutationRequestType,
  config: Partial<RequestConfig<LogisticsUpdateLogisticsMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsUpdateLogisticsMutationResponseType, ResponseErrorConfig<Error>, LogisticsUpdateLogisticsMutationRequestType>({
    method: 'PUT',
    url: `/services/logistics/${id}`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description Обновляет существующую запись логистики, включая описание маршрута
 * @summary Обновление логистики
 * {@link /services/logistics/:id}
 */
export function useLogisticsUpdateLogistics(
  options: {
    mutation?: UseMutationOptions<
      LogisticsUpdateLogisticsMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: LogisticsUpdateLogisticsPathParamsType['id']; data: LogisticsUpdateLogisticsMutationRequestType }
    >
    client?: Partial<RequestConfig<LogisticsUpdateLogisticsMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsUpdateLogisticsMutationKey()

  return useMutation<
    LogisticsUpdateLogisticsMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: LogisticsUpdateLogisticsPathParamsType['id']; data: LogisticsUpdateLogisticsMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return logisticsUpdateLogistics(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}