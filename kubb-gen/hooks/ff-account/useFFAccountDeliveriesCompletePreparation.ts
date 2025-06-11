import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesCompletePreparationMutationResponseType,
  FFAccountDeliveriesCompletePreparationPathParamsType,
  FFAccountDeliveriesCompletePreparation400Type,
  FFAccountDeliveriesCompletePreparation404Type,
} from '../../types/ff-account/FFAccountDeliveriesCompletePreparationType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesCompletePreparationMutationKey = () => [{ url: '/ff-account/deliveries/{id}/complete-preparation' }] as const

export type FFAccountDeliveriesCompletePreparationMutationKey = ReturnType<typeof FFAccountDeliveriesCompletePreparationMutationKey>

/**
 * @description Переводит поставку из стадии "В работе" в "Выполнено" (статус COMPLETED), выполнив проверки.
 * @summary (Подготовка/В работе) Завершить подготовку
 * {@link /ff-account/deliveries/:id/complete-preparation}
 */
export async function FFAccountDeliveriesCompletePreparation(
  id: FFAccountDeliveriesCompletePreparationPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesCompletePreparationMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesCompletePreparation400Type | FFAccountDeliveriesCompletePreparation404Type>,
    unknown
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/complete-preparation`, ...requestConfig })
  return res.data
}

/**
 * @description Переводит поставку из стадии "В работе" в "Выполнено" (статус COMPLETED), выполнив проверки.
 * @summary (Подготовка/В работе) Завершить подготовку
 * {@link /ff-account/deliveries/:id/complete-preparation}
 */
export function useFFAccountDeliveriesCompletePreparation<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesCompletePreparationMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesCompletePreparation400Type | FFAccountDeliveriesCompletePreparation404Type>,
      { id: FFAccountDeliveriesCompletePreparationPathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesCompletePreparationMutationKey()

  return useMutation<
    FFAccountDeliveriesCompletePreparationMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesCompletePreparation400Type | FFAccountDeliveriesCompletePreparation404Type>,
    { id: FFAccountDeliveriesCompletePreparationPathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return FFAccountDeliveriesCompletePreparation(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}