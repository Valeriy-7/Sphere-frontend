import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesStartPreparationMutationResponseType,
  FFAccountDeliveriesStartPreparationPathParamsType,
  FFAccountDeliveriesStartPreparation400Type,
  FFAccountDeliveriesStartPreparation404Type,
} from '../../types/ff-account/FFAccountDeliveriesStartPreparationType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesStartPreparationMutationKey = () => [{ url: '/ff-account/deliveries/{id}/start-preparation' }] as const

export type FFAccountDeliveriesStartPreparationMutationKey = ReturnType<typeof FFAccountDeliveriesStartPreparationMutationKey>

/**
 * @description Переводит поставку из стадии "Новые" в "В работе" в разделе Подготовка.
 * @summary (Подготовка) Начать подготовку
 * {@link /ff-account/deliveries/:id/start-preparation}
 */
export async function FFAccountDeliveriesStartPreparation(
  id: FFAccountDeliveriesStartPreparationPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesStartPreparationMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesStartPreparation400Type | FFAccountDeliveriesStartPreparation404Type>,
    unknown
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/start-preparation`, ...requestConfig })
  return res.data
}

/**
 * @description Переводит поставку из стадии "Новые" в "В работе" в разделе Подготовка.
 * @summary (Подготовка) Начать подготовку
 * {@link /ff-account/deliveries/:id/start-preparation}
 */
export function useFFAccountDeliveriesStartPreparation<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesStartPreparationMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesStartPreparation400Type | FFAccountDeliveriesStartPreparation404Type>,
      { id: FFAccountDeliveriesStartPreparationPathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesStartPreparationMutationKey()

  return useMutation<
    FFAccountDeliveriesStartPreparationMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesStartPreparation400Type | FFAccountDeliveriesStartPreparation404Type>,
    { id: FFAccountDeliveriesStartPreparationPathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return FFAccountDeliveriesStartPreparation(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}