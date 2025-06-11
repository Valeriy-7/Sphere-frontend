import client from '@/modules/auth/axios-client'
import type {
  LogisticsTypeCreateLogisticsTypeMutationRequestType,
  LogisticsTypeCreateLogisticsTypeMutationResponseType,
} from '../../types/logistics-types/LogisticsTypeCreateLogisticsTypeType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const logisticsTypeCreateLogisticsTypeMutationKey = () => [{ url: '/logistics-types' }] as const

export type LogisticsTypeCreateLogisticsTypeMutationKey = ReturnType<typeof logisticsTypeCreateLogisticsTypeMutationKey>

/**
 * @summary Создать новый тип логистики
 * {@link /logistics-types}
 */
export async function logisticsTypeCreateLogisticsType(
  data: LogisticsTypeCreateLogisticsTypeMutationRequestType,
  config: Partial<RequestConfig<LogisticsTypeCreateLogisticsTypeMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    LogisticsTypeCreateLogisticsTypeMutationResponseType,
    ResponseErrorConfig<Error>,
    LogisticsTypeCreateLogisticsTypeMutationRequestType
  >({ method: 'POST', url: `/logistics-types`, data, ...requestConfig })
  return res.data
}

/**
 * @summary Создать новый тип логистики
 * {@link /logistics-types}
 */
export function useLogisticsTypeCreateLogisticsType<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsTypeCreateLogisticsTypeMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: LogisticsTypeCreateLogisticsTypeMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<LogisticsTypeCreateLogisticsTypeMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? logisticsTypeCreateLogisticsTypeMutationKey()

  return useMutation<
    LogisticsTypeCreateLogisticsTypeMutationResponseType,
    ResponseErrorConfig<Error>,
    { data: LogisticsTypeCreateLogisticsTypeMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return logisticsTypeCreateLogisticsType(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}