import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ServicesDeleteConsumableMutationResponseType, ServicesDeleteConsumablePathParamsType } from '../../types/services/ServicesDeleteConsumableType'
import { useMutation } from '@tanstack/react-query'

export const servicesDeleteConsumableMutationKey = () => [{ url: '/services/consumable/{id}' }] as const

export type ServicesDeleteConsumableMutationKey = ReturnType<typeof servicesDeleteConsumableMutationKey>

/**
 * @summary Удаление расходника
 * {@link /services/consumable/:id}
 */
export async function servicesDeleteConsumable(
  id: ServicesDeleteConsumablePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ServicesDeleteConsumableMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/services/consumable/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Удаление расходника
 * {@link /services/consumable/:id}
 */
export function useServicesDeleteConsumable(
  options: {
    mutation?: UseMutationOptions<
      ServicesDeleteConsumableMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: ServicesDeleteConsumablePathParamsType['id'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? servicesDeleteConsumableMutationKey()

  return useMutation<ServicesDeleteConsumableMutationResponseType, ResponseErrorConfig<Error>, { id: ServicesDeleteConsumablePathParamsType['id'] }>({
    mutationFn: async ({ id }) => {
      return servicesDeleteConsumable(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}