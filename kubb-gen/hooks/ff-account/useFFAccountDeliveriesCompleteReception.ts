import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesCompleteReceptionMutationResponseType,
  FFAccountDeliveriesCompleteReceptionPathParamsType,
  FFAccountDeliveriesCompleteReception400Type,
  FFAccountDeliveriesCompleteReception404Type,
} from '../../types/ff-account/FFAccountDeliveriesCompleteReceptionType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesCompleteReceptionMutationKey = () => [{ url: '/ff-account/deliveries/{id}/complete-reception' }] as const

export type FFAccountDeliveriesCompleteReceptionMutationKey = ReturnType<typeof FFAccountDeliveriesCompleteReceptionMutationKey>

/**
 * @summary Завершить приемку поставки и перевести в статус "Принято"
 * {@link /ff-account/deliveries/:id/complete-reception}
 */
export async function FFAccountDeliveriesCompleteReception(
  id: FFAccountDeliveriesCompleteReceptionPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesCompleteReceptionMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesCompleteReception400Type | FFAccountDeliveriesCompleteReception404Type>,
    unknown
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/complete-reception`, ...requestConfig })
  return res.data
}

/**
 * @summary Завершить приемку поставки и перевести в статус "Принято"
 * {@link /ff-account/deliveries/:id/complete-reception}
 */
export function useFFAccountDeliveriesCompleteReception<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesCompleteReceptionMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesCompleteReception400Type | FFAccountDeliveriesCompleteReception404Type>,
      { id: FFAccountDeliveriesCompleteReceptionPathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesCompleteReceptionMutationKey()

  return useMutation<
    FFAccountDeliveriesCompleteReceptionMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesCompleteReception400Type | FFAccountDeliveriesCompleteReception404Type>,
    { id: FFAccountDeliveriesCompleteReceptionPathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return FFAccountDeliveriesCompleteReception(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}