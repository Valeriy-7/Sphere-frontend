import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  ServicesUpdateConsumableMutationRequestType,
  ServicesUpdateConsumableMutationResponseType,
  ServicesUpdateConsumablePathParamsType,
} from '../../types/services/ServicesUpdateConsumableType'
import { useMutation } from '@tanstack/react-query'

export const servicesUpdateConsumableMutationKey = () => [{ url: '/services/consumable/{id}' }] as const

export type ServicesUpdateConsumableMutationKey = ReturnType<typeof servicesUpdateConsumableMutationKey>

/**
 * @summary Обновление расходника
 * {@link /services/consumable/:id}
 */
export async function servicesUpdateConsumable(
  id: ServicesUpdateConsumablePathParamsType['id'],
  data: ServicesUpdateConsumableMutationRequestType,
  config: Partial<RequestConfig<ServicesUpdateConsumableMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<ServicesUpdateConsumableMutationResponseType, ResponseErrorConfig<Error>, ServicesUpdateConsumableMutationRequestType>({
    method: 'PUT',
    url: `/services/consumable/${id}`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Обновление расходника
 * {@link /services/consumable/:id}
 */
export function useServicesUpdateConsumable(
  options: {
    mutation?: UseMutationOptions<
      ServicesUpdateConsumableMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: ServicesUpdateConsumablePathParamsType['id']; data: ServicesUpdateConsumableMutationRequestType }
    >
    client?: Partial<RequestConfig<ServicesUpdateConsumableMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesUpdateConsumableMutationKey()

  return useMutation<
    ServicesUpdateConsumableMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: ServicesUpdateConsumablePathParamsType['id']; data: ServicesUpdateConsumableMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return servicesUpdateConsumable(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}