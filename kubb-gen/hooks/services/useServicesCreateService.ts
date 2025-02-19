import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ServicesCreateServiceMutationRequestType, ServicesCreateServiceMutationResponseType } from '../../types/services/ServicesCreateServiceType'
import { useMutation } from '@tanstack/react-query'

export const servicesCreateServiceMutationKey = () => [{ url: '/services/service' }] as const

export type ServicesCreateServiceMutationKey = ReturnType<typeof servicesCreateServiceMutationKey>

/**
 * @summary Создание новой услуги
 * {@link /services/service}
 */
export async function servicesCreateService(
  data: ServicesCreateServiceMutationRequestType,
  config: Partial<RequestConfig<ServicesCreateServiceMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<ServicesCreateServiceMutationResponseType, ResponseErrorConfig<Error>, ServicesCreateServiceMutationRequestType>({
    method: 'POST',
    url: `/services/service`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Создание новой услуги
 * {@link /services/service}
 */
export function useServicesCreateService(
  options: {
    mutation?: UseMutationOptions<ServicesCreateServiceMutationResponseType, ResponseErrorConfig<Error>, { data: ServicesCreateServiceMutationRequestType }>
    client?: Partial<RequestConfig<ServicesCreateServiceMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesCreateServiceMutationKey()

  return useMutation<ServicesCreateServiceMutationResponseType, ResponseErrorConfig<Error>, { data: ServicesCreateServiceMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return servicesCreateService(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}