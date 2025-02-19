import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  ServicesUpdateServiceMutationRequestType,
  ServicesUpdateServiceMutationResponseType,
  ServicesUpdateServicePathParamsType,
} from '../../types/services/ServicesUpdateServiceType'
import { useMutation } from '@tanstack/react-query'

export const servicesUpdateServiceMutationKey = () => [{ url: '/services/service/{id}' }] as const

export type ServicesUpdateServiceMutationKey = ReturnType<typeof servicesUpdateServiceMutationKey>

/**
 * @summary Обновление услуги
 * {@link /services/service/:id}
 */
export async function servicesUpdateService(
  id: ServicesUpdateServicePathParamsType['id'],
  data: ServicesUpdateServiceMutationRequestType,
  config: Partial<RequestConfig<ServicesUpdateServiceMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || value instanceof Blob)) {
        formData.append(key, value)
      }
    })
  }
  const res = await request<ServicesUpdateServiceMutationResponseType, ResponseErrorConfig<Error>, ServicesUpdateServiceMutationRequestType>({
    method: 'PUT',
    url: `/services/service/${id}`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Обновление услуги
 * {@link /services/service/:id}
 */
export function useServicesUpdateService(
  options: {
    mutation?: UseMutationOptions<
      ServicesUpdateServiceMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: ServicesUpdateServicePathParamsType['id']; data: ServicesUpdateServiceMutationRequestType }
    >
    client?: Partial<RequestConfig<ServicesUpdateServiceMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesUpdateServiceMutationKey()

  return useMutation<
    ServicesUpdateServiceMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: ServicesUpdateServicePathParamsType['id']; data: ServicesUpdateServiceMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return servicesUpdateService(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}