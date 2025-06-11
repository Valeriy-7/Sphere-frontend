import client from '@/modules/auth/axios-client'
import type {
  LogisticsTypeDeleteLogisticsTypeMutationResponseType,
  LogisticsTypeDeleteLogisticsTypePathParamsType,
} from '../../types/logistics-types/LogisticsTypeDeleteLogisticsTypeType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const logisticsTypeDeleteLogisticsTypeMutationKey = () => [{ url: '/logistics-types/{id}' }] as const

export type LogisticsTypeDeleteLogisticsTypeMutationKey = ReturnType<typeof logisticsTypeDeleteLogisticsTypeMutationKey>

/**
 * @summary Удалить тип логистики
 * {@link /logistics-types/:id}
 */
export async function logisticsTypeDeleteLogisticsType(
  id: LogisticsTypeDeleteLogisticsTypePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LogisticsTypeDeleteLogisticsTypeMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: `/logistics-types/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Удалить тип логистики
 * {@link /logistics-types/:id}
 */
export function useLogisticsTypeDeleteLogisticsType<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsTypeDeleteLogisticsTypeMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: LogisticsTypeDeleteLogisticsTypePathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsTypeDeleteLogisticsTypeMutationKey()

  return useMutation<
    LogisticsTypeDeleteLogisticsTypeMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: LogisticsTypeDeleteLogisticsTypePathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return logisticsTypeDeleteLogisticsType(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}