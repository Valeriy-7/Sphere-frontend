import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ServicesDeleteServiceMutationResponseType, ServicesDeleteServicePathParamsType } from '../../types/services/ServicesDeleteServiceType'
import { useMutation } from '@tanstack/react-query'

export const servicesDeleteServiceMutationKey = () => [{ url: '/services/service/{id}' }] as const

export type ServicesDeleteServiceMutationKey = ReturnType<typeof servicesDeleteServiceMutationKey>

/**
 * @summary Удаление услуги
 * {@link /services/service/:id}
 */
export async function servicesDeleteService(id: ServicesDeleteServicePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesDeleteServiceMutationResponseType, ResponseErrorConfig<Error>, unknown>({
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
export function useServicesDeleteService(
  options: {
    mutation?: UseMutationOptions<ServicesDeleteServiceMutationResponseType, ResponseErrorConfig<Error>, { id: ServicesDeleteServicePathParamsType['id'] }>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesDeleteServiceMutationKey()

  return useMutation<ServicesDeleteServiceMutationResponseType, ResponseErrorConfig<Error>, { id: ServicesDeleteServicePathParamsType['id'] }>({
    mutationFn: async ({ id }) => {
      return servicesDeleteService(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}