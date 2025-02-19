import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { CabinetsRemoveMutationResponseType, CabinetsRemovePathParamsType, CabinetsRemove404Type } from '../../types/cabinets/CabinetsRemoveType'
import { useMutation } from '@tanstack/react-query'

export const cabinetsRemoveMutationKey = () => [{ url: '/cabinets/{id}' }] as const

export type CabinetsRemoveMutationKey = ReturnType<typeof cabinetsRemoveMutationKey>

/**
 * @description     Удаляет кабинет пользователя.    ### Особенности:    - Нельзя удалить единственный кабинет    - При удалении активного кабинета нужно выбрать новый    - История операций сохраняется
 * @summary Удаление кабинета
 * {@link /cabinets/:id}
 */
export async function cabinetsRemove(id: CabinetsRemovePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsRemoveMutationResponseType, ResponseErrorConfig<CabinetsRemove404Type>, unknown>({
    method: 'DELETE',
    url: `/cabinets/${id}`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description     Удаляет кабинет пользователя.    ### Особенности:    - Нельзя удалить единственный кабинет    - При удалении активного кабинета нужно выбрать новый    - История операций сохраняется
 * @summary Удаление кабинета
 * {@link /cabinets/:id}
 */
export function useCabinetsRemove(
  options: {
    mutation?: UseMutationOptions<CabinetsRemoveMutationResponseType, ResponseErrorConfig<CabinetsRemove404Type>, { id: CabinetsRemovePathParamsType['id'] }>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsRemoveMutationKey()

  return useMutation<CabinetsRemoveMutationResponseType, ResponseErrorConfig<CabinetsRemove404Type>, { id: CabinetsRemovePathParamsType['id'] }>({
    mutationFn: async ({ id }) => {
      return cabinetsRemove(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}