import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  ServicesUpdateLogisticsMutationRequestType,
  ServicesUpdateLogisticsMutationResponseType,
  ServicesUpdateLogisticsPathParamsType,
} from '../../types/services/ServicesUpdateLogisticsType'
import { useMutation } from '@tanstack/react-query'

export const servicesUpdateLogisticsMutationKey = () => [{ url: '/services/logistics/{id}' }] as const

export type ServicesUpdateLogisticsMutationKey = ReturnType<typeof servicesUpdateLogisticsMutationKey>

/**
 * @summary Обновление записи логистики
 * {@link /services/logistics/:id}
 */
export async function servicesUpdateLogistics(
  id: ServicesUpdateLogisticsPathParamsType['id'],
  data: ServicesUpdateLogisticsMutationRequestType,
  config: Partial<RequestConfig<ServicesUpdateLogisticsMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesUpdateLogisticsMutationResponseType, ResponseErrorConfig<Error>, ServicesUpdateLogisticsMutationRequestType>({
    method: 'PUT',
    url: `/services/logistics/${id}`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Обновление записи логистики
 * {@link /services/logistics/:id}
 */
export function useServicesUpdateLogistics(
  options: {
    mutation?: UseMutationOptions<
      ServicesUpdateLogisticsMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: ServicesUpdateLogisticsPathParamsType['id']; data: ServicesUpdateLogisticsMutationRequestType }
    >
    client?: Partial<RequestConfig<ServicesUpdateLogisticsMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesUpdateLogisticsMutationKey()

  return useMutation<
    ServicesUpdateLogisticsMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: ServicesUpdateLogisticsPathParamsType['id']; data: ServicesUpdateLogisticsMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return servicesUpdateLogistics(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}