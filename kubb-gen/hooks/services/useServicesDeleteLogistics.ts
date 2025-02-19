import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ServicesDeleteLogisticsMutationResponseType, ServicesDeleteLogisticsPathParamsType } from '../../types/services/ServicesDeleteLogisticsType'
import { useMutation } from '@tanstack/react-query'

export const servicesDeleteLogisticsMutationKey = () => [{ url: '/services/logistics/{id}' }] as const

export type ServicesDeleteLogisticsMutationKey = ReturnType<typeof servicesDeleteLogisticsMutationKey>

/**
 * @summary Удаление записи логистики
 * {@link /services/logistics/:id}
 */
export async function servicesDeleteLogistics(
  id: ServicesDeleteLogisticsPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesDeleteLogisticsMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/services/logistics/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Удаление записи логистики
 * {@link /services/logistics/:id}
 */
export function useServicesDeleteLogistics(
  options: {
    mutation?: UseMutationOptions<ServicesDeleteLogisticsMutationResponseType, ResponseErrorConfig<Error>, { id: ServicesDeleteLogisticsPathParamsType['id'] }>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesDeleteLogisticsMutationKey()

  return useMutation<ServicesDeleteLogisticsMutationResponseType, ResponseErrorConfig<Error>, { id: ServicesDeleteLogisticsPathParamsType['id'] }>({
    mutationFn: async ({ id }) => {
      return servicesDeleteLogistics(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}