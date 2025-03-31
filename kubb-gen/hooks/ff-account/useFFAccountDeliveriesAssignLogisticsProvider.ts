import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  FFAccountDeliveriesAssignLogisticsProviderMutationRequestType,
  FFAccountDeliveriesAssignLogisticsProviderMutationResponseType,
  FFAccountDeliveriesAssignLogisticsProviderPathParamsType,
  FFAccountDeliveriesAssignLogisticsProvider404Type,
} from '../../types/ff-account/FFAccountDeliveriesAssignLogisticsProviderType'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesAssignLogisticsProviderMutationKey = () => [{ url: '/ff-account/deliveries/{id}/logistics-provider' }] as const

export type FFAccountDeliveriesAssignLogisticsProviderMutationKey = ReturnType<typeof FFAccountDeliveriesAssignLogisticsProviderMutationKey>

/**
 * @description Назначает логиста для поставки. Если поставка в статусе "Создано", автоматически переводит её в статус "В работе".
 * @summary Назначить логиста для поставки
 * {@link /ff-account/deliveries/:id/logistics-provider}
 */
export async function FFAccountDeliveriesAssignLogisticsProvider(
  id: FFAccountDeliveriesAssignLogisticsProviderPathParamsType['id'],
  data: FFAccountDeliveriesAssignLogisticsProviderMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesAssignLogisticsProviderMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesAssignLogisticsProviderMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignLogisticsProvider404Type>,
    FFAccountDeliveriesAssignLogisticsProviderMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/logistics-provider`, data, ...requestConfig })
  return res.data
}

/**
 * @description Назначает логиста для поставки. Если поставка в статусе "Создано", автоматически переводит её в статус "В работе".
 * @summary Назначить логиста для поставки
 * {@link /ff-account/deliveries/:id/logistics-provider}
 */
export function useFFAccountDeliveriesAssignLogisticsProvider<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesAssignLogisticsProviderMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesAssignLogisticsProvider404Type>,
      { id: FFAccountDeliveriesAssignLogisticsProviderPathParamsType['id']; data: FFAccountDeliveriesAssignLogisticsProviderMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesAssignLogisticsProviderMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesAssignLogisticsProviderMutationKey()

  return useMutation<
    FFAccountDeliveriesAssignLogisticsProviderMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignLogisticsProvider404Type>,
    { id: FFAccountDeliveriesAssignLogisticsProviderPathParamsType['id']; data: FFAccountDeliveriesAssignLogisticsProviderMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesAssignLogisticsProvider(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}