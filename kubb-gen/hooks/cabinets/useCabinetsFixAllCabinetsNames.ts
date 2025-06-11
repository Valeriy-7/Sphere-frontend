import client from '@/modules/auth/axios-client'
import type { CabinetsFixAllCabinetsNamesMutationResponseType } from '../../types/cabinets/CabinetsFixAllCabinetsNamesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const cabinetsFixAllCabinetsNamesMutationKey = () => [{ url: '/cabinets/fix-names' }] as const

export type CabinetsFixAllCabinetsNamesMutationKey = ReturnType<typeof cabinetsFixAllCabinetsNamesMutationKey>

/**
 * @summary Исправление форматов названий компаний у всех кабинетов
 * {@link /cabinets/fix-names}
 */
export async function cabinetsFixAllCabinetsNames(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsFixAllCabinetsNamesMutationResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: `/cabinets/fix-names`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @summary Исправление форматов названий компаний у всех кабинетов
 * {@link /cabinets/fix-names}
 */
export function useCabinetsFixAllCabinetsNames<TContext>(
  options: {
    mutation?: UseMutationOptions<CabinetsFixAllCabinetsNamesMutationResponseType, ResponseErrorConfig<Error>, undefined, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsFixAllCabinetsNamesMutationKey()

  return useMutation<CabinetsFixAllCabinetsNamesMutationResponseType, ResponseErrorConfig<Error>, undefined, TContext>({
    mutationFn: async () => {
      return cabinetsFixAllCabinetsNames(config)
    },
    mutationKey,
    ...mutationOptions,
  })
}