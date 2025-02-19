import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  ServicesCreateConsumableMutationRequestType,
  ServicesCreateConsumableMutationResponseType,
} from '../../types/services/ServicesCreateConsumableType'
import { useMutation } from '@tanstack/react-query'

export const servicesCreateConsumableMutationKey = () => [{ url: '/services/consumable' }] as const

export type ServicesCreateConsumableMutationKey = ReturnType<typeof servicesCreateConsumableMutationKey>

/**
 * @summary Создание нового расходника
 * {@link /services/consumable}
 */
export async function servicesCreateConsumable(
  data: ServicesCreateConsumableMutationRequestType,
  config: Partial<RequestConfig<ServicesCreateConsumableMutationRequestType>> & { client?: typeof client } = {},
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
  const res = await request<ServicesCreateConsumableMutationResponseType, ResponseErrorConfig<Error>, ServicesCreateConsumableMutationRequestType>({
    method: 'POST',
    url: `/services/consumable`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @summary Создание нового расходника
 * {@link /services/consumable}
 */
export function useServicesCreateConsumable(
  options: {
    mutation?: UseMutationOptions<
      ServicesCreateConsumableMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: ServicesCreateConsumableMutationRequestType }
    >
    client?: Partial<RequestConfig<ServicesCreateConsumableMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesCreateConsumableMutationKey()

  return useMutation<ServicesCreateConsumableMutationResponseType, ResponseErrorConfig<Error>, { data: ServicesCreateConsumableMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return servicesCreateConsumable(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}