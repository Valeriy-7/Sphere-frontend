import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesProcessReceptionMutationRequestType,
  FFAccountDeliveriesProcessReceptionMutationResponseType,
  FFAccountDeliveriesProcessReceptionPathParamsType,
  FFAccountDeliveriesProcessReception400Type,
  FFAccountDeliveriesProcessReception404Type,
} from '../../types/ff-account/FFAccountDeliveriesProcessReceptionType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesProcessReceptionMutationKey = () => [{ url: '/ff-account/deliveries/{id}/reception' }] as const

export type FFAccountDeliveriesProcessReceptionMutationKey = ReturnType<typeof FFAccountDeliveriesProcessReceptionMutationKey>

/**
 * @summary Обработать приемку поставки (статус, ответственный, логистика)
 * {@link /ff-account/deliveries/:id/reception}
 */
export async function FFAccountDeliveriesProcessReception(
  id: FFAccountDeliveriesProcessReceptionPathParamsType['id'],
  data?: FFAccountDeliveriesProcessReceptionMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesProcessReceptionMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesProcessReceptionMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesProcessReception400Type | FFAccountDeliveriesProcessReception404Type>,
    FFAccountDeliveriesProcessReceptionMutationRequestType
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/reception`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Обработать приемку поставки (статус, ответственный, логистика)
 * {@link /ff-account/deliveries/:id/reception}
 */
export function useFFAccountDeliveriesProcessReception<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesProcessReceptionMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesProcessReception400Type | FFAccountDeliveriesProcessReception404Type>,
      { id: FFAccountDeliveriesProcessReceptionPathParamsType['id']; data?: FFAccountDeliveriesProcessReceptionMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesProcessReceptionMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesProcessReceptionMutationKey()

  return useMutation<
    FFAccountDeliveriesProcessReceptionMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesProcessReception400Type | FFAccountDeliveriesProcessReception404Type>,
    { id: FFAccountDeliveriesProcessReceptionPathParamsType['id']; data?: FFAccountDeliveriesProcessReceptionMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesProcessReception(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}