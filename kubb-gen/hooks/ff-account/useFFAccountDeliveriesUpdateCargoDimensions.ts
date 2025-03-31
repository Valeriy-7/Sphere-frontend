import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType,
  FFAccountDeliveriesUpdateCargoDimensionsMutationResponseType,
  FFAccountDeliveriesUpdateCargoDimensionsPathParamsType,
  FFAccountDeliveriesUpdateCargoDimensions404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateCargoDimensionsType'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateCargoDimensionsMutationKey = () => [{ url: '/ff-account/deliveries/{id}/cargo-dimensions' }] as const

export type FFAccountDeliveriesUpdateCargoDimensionsMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateCargoDimensionsMutationKey>

/**
 * @description Обновляет информацию о размерах груза поставки. При указании всех трех измерений автоматически рассчитывает объем.
 * @summary Обновить размеры груза
 * {@link /ff-account/deliveries/:id/cargo-dimensions}
 */
export async function FFAccountDeliveriesUpdateCargoDimensions(
  id: FFAccountDeliveriesUpdateCargoDimensionsPathParamsType['id'],
  data?: FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateCargoDimensionsMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateCargoDimensions404Type>,
    FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/cargo-dimensions`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет информацию о размерах груза поставки. При указании всех трех измерений автоматически рассчитывает объем.
 * @summary Обновить размеры груза
 * {@link /ff-account/deliveries/:id/cargo-dimensions}
 */
export function useFFAccountDeliveriesUpdateCargoDimensions<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateCargoDimensionsMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateCargoDimensions404Type>,
      { id: FFAccountDeliveriesUpdateCargoDimensionsPathParamsType['id']; data?: FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateCargoDimensionsMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateCargoDimensionsMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateCargoDimensions404Type>,
    { id: FFAccountDeliveriesUpdateCargoDimensionsPathParamsType['id']; data?: FFAccountDeliveriesUpdateCargoDimensionsMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateCargoDimensions(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}