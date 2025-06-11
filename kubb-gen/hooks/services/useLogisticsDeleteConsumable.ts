import client from '@/modules/auth/axios-client'
import type { LogisticsDeleteConsumableMutationResponseType, LogisticsDeleteConsumablePathParamsType } from '../../types/services/LogisticsDeleteConsumableType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const logisticsDeleteConsumableMutationKey = () => [{ url: '/services/consumables/{id}' }] as const

export type LogisticsDeleteConsumableMutationKey = ReturnType<typeof logisticsDeleteConsumableMutationKey>

/**
 * @summary Удаление расходника
 * {@link /services/consumables/:id}
 */
export async function logisticsDeleteConsumable(
  id: LogisticsDeleteConsumablePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsDeleteConsumableMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/services/consumables/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Удаление расходника
 * {@link /services/consumables/:id}
 */
export function useLogisticsDeleteConsumable<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsDeleteConsumableMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: LogisticsDeleteConsumablePathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsDeleteConsumableMutationKey()

  return useMutation<
    LogisticsDeleteConsumableMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: LogisticsDeleteConsumablePathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return logisticsDeleteConsumable(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}