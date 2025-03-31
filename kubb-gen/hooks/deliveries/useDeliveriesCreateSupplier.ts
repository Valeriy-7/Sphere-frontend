import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  DeliveriesCreateSupplierMutationRequestType,
  DeliveriesCreateSupplierMutationResponseType,
  DeliveriesCreateSupplier400Type,
  DeliveriesCreateSupplier401Type,
} from '../../types/deliveries/DeliveriesCreateSupplierType'
import { useMutation } from '@tanstack/react-query'

export const deliveriesCreateSupplierMutationKey = () => [{ url: '/deliveries/suppliers' }] as const

export type DeliveriesCreateSupplierMutationKey = ReturnType<typeof deliveriesCreateSupplierMutationKey>

/**
 * @description Создает нового поставщика для указанного кабинета
 * @summary Создание поставщика
 * {@link /deliveries/suppliers}
 */
export async function deliveriesCreateSupplier(
  data: DeliveriesCreateSupplierMutationRequestType,
  config: Partial<RequestConfig<DeliveriesCreateSupplierMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveriesCreateSupplierMutationResponseType,
    ResponseErrorConfig<DeliveriesCreateSupplier400Type | DeliveriesCreateSupplier401Type>,
    DeliveriesCreateSupplierMutationRequestType
  >({ method: 'POST', url: `/deliveries/suppliers`, data, ...requestConfig })
  return res.data
}

/**
 * @description Создает нового поставщика для указанного кабинета
 * @summary Создание поставщика
 * {@link /deliveries/suppliers}
 */
export function useDeliveriesCreateSupplier<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveriesCreateSupplierMutationResponseType,
      ResponseErrorConfig<DeliveriesCreateSupplier400Type | DeliveriesCreateSupplier401Type>,
      { data: DeliveriesCreateSupplierMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveriesCreateSupplierMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveriesCreateSupplierMutationKey()

  return useMutation<
    DeliveriesCreateSupplierMutationResponseType,
    ResponseErrorConfig<DeliveriesCreateSupplier400Type | DeliveriesCreateSupplier401Type>,
    { data: DeliveriesCreateSupplierMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return deliveriesCreateSupplier(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}