import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType,
  FFAccountDeliveriesUpdateWarehousePlaceMutationResponseType,
  FFAccountDeliveriesUpdateWarehousePlacePathParamsType,
  FFAccountDeliveriesUpdateWarehousePlace404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateWarehousePlaceType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateWarehousePlaceMutationKey = () => [{ url: '/ff-account/deliveries/{id}/warehouse-place' }] as const

export type FFAccountDeliveriesUpdateWarehousePlaceMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateWarehousePlaceMutationKey>

/**
 * @description Обновляет место хранения для всей поставки. Каждый новый POST запрос стирает старое значение и сохраняет новое место.
 * @summary (Подготовка) Обновить место хранения для поставки
 * {@link /ff-account/deliveries/:id/warehouse-place}
 */
export async function FFAccountDeliveriesUpdateWarehousePlace(
  id: FFAccountDeliveriesUpdateWarehousePlacePathParamsType['id'],
  data: FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateWarehousePlaceMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateWarehousePlace404Type>,
    FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/warehouse-place`, data, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет место хранения для всей поставки. Каждый новый POST запрос стирает старое значение и сохраняет новое место.
 * @summary (Подготовка) Обновить место хранения для поставки
 * {@link /ff-account/deliveries/:id/warehouse-place}
 */
export function useFFAccountDeliveriesUpdateWarehousePlace<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateWarehousePlaceMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateWarehousePlace404Type>,
      { id: FFAccountDeliveriesUpdateWarehousePlacePathParamsType['id']; data: FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateWarehousePlaceMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateWarehousePlaceMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateWarehousePlace404Type>,
    { id: FFAccountDeliveriesUpdateWarehousePlacePathParamsType['id']; data: FFAccountDeliveriesUpdateWarehousePlaceMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateWarehousePlace(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}