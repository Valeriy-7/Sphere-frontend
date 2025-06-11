import client from '@/modules/auth/axios-client'
import type { CabinetsFixCabinetNamesMutationResponseType, CabinetsFixCabinetNamesPathParamsType } from '../../types/cabinets/CabinetsFixCabinetNamesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const cabinetsFixCabinetNamesMutationKey = () => [{ url: '/cabinets/fix-cabinet-names/{id}' }] as const

export type CabinetsFixCabinetNamesMutationKey = ReturnType<typeof cabinetsFixCabinetNamesMutationKey>

/**
 * @summary Исправление форматов названий компаний у конкретного кабинета
 * {@link /cabinets/fix-cabinet-names/:id}
 */
export async function cabinetsFixCabinetNames(
  id: CabinetsFixCabinetNamesPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsFixCabinetNamesMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: `/cabinets/fix-cabinet-names/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Исправление форматов названий компаний у конкретного кабинета
 * {@link /cabinets/fix-cabinet-names/:id}
 */
export function useCabinetsFixCabinetNames<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CabinetsFixCabinetNamesMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: CabinetsFixCabinetNamesPathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsFixCabinetNamesMutationKey()

  return useMutation<CabinetsFixCabinetNamesMutationResponseType, ResponseErrorConfig<Error>, { id: CabinetsFixCabinetNamesPathParamsType['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return cabinetsFixCabinetNames(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}