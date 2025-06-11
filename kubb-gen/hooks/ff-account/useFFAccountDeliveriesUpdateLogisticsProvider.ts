import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesUpdateLogisticsProviderMutationResponseType,
  FFAccountDeliveriesUpdateLogisticsProviderPathParamsType,
  FFAccountDeliveriesUpdateLogisticsProvider404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateLogisticsProviderType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesUpdateLogisticsProviderMutationKey = () => [{ url: '/ff-account/deliveries/{id}/logistics-provider' }] as const

export type FFAccountDeliveriesUpdateLogisticsProviderMutationKey = ReturnType<typeof FFAccountDeliveriesUpdateLogisticsProviderMutationKey>

/**
 * @description Обновляет только логиста без изменения статуса поставки.
 * @summary Обновить логиста
 * {@link /ff-account/deliveries/:id/logistics-provider}
 */
export async function FFAccountDeliveriesUpdateLogisticsProvider(
  id: FFAccountDeliveriesUpdateLogisticsProviderPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesUpdateLogisticsProviderMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateLogisticsProvider404Type>,
    unknown
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/logistics-provider`, ...requestConfig })
  return res.data
}

/**
 * @description Обновляет только логиста без изменения статуса поставки.
 * @summary Обновить логиста
 * {@link /ff-account/deliveries/:id/logistics-provider}
 */
export function useFFAccountDeliveriesUpdateLogisticsProvider<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateLogisticsProviderMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateLogisticsProvider404Type>,
      { id: FFAccountDeliveriesUpdateLogisticsProviderPathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateLogisticsProviderMutationKey()

  return useMutation<
    FFAccountDeliveriesUpdateLogisticsProviderMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateLogisticsProvider404Type>,
    { id: FFAccountDeliveriesUpdateLogisticsProviderPathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return FFAccountDeliveriesUpdateLogisticsProvider(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}