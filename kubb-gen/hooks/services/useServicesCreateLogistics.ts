import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ServicesCreateLogisticsMutationRequestType, ServicesCreateLogisticsMutationResponseType } from '../../types/services/ServicesCreateLogisticsType'
import { useMutation } from '@tanstack/react-query'

export const servicesCreateLogisticsMutationKey = () => [{ url: '/services/logistics' }] as const

export type ServicesCreateLogisticsMutationKey = ReturnType<typeof servicesCreateLogisticsMutationKey>

/**
 * @summary Создание новой логистики
 * {@link /services/logistics}
 */
export async function servicesCreateLogistics(
  data: ServicesCreateLogisticsMutationRequestType,
  config: Partial<RequestConfig<ServicesCreateLogisticsMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesCreateLogisticsMutationResponseType, ResponseErrorConfig<Error>, ServicesCreateLogisticsMutationRequestType>({
    method: 'POST',
    url: `/services/logistics`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Создание новой логистики
 * {@link /services/logistics}
 */
export function useServicesCreateLogistics(
  options: {
    mutation?: UseMutationOptions<ServicesCreateLogisticsMutationResponseType, ResponseErrorConfig<Error>, { data: ServicesCreateLogisticsMutationRequestType }>
    client?: Partial<RequestConfig<ServicesCreateLogisticsMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesCreateLogisticsMutationKey()

  return useMutation<ServicesCreateLogisticsMutationResponseType, ResponseErrorConfig<Error>, { data: ServicesCreateLogisticsMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return servicesCreateLogistics(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}