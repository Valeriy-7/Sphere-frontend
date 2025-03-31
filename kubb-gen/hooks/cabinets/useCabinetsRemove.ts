import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { CabinetsRemoveMutationResponseType, CabinetsRemovePathParamsType, CabinetsRemove404Type } from '../../types/cabinets/CabinetsRemoveType'
import { useMutation } from '@tanstack/react-query'

export const cabinetsRemoveMutationKey = () => [{ url: '/cabinets/{id}' }] as const

export type CabinetsRemoveMutationKey = ReturnType<typeof cabinetsRemoveMutationKey>

/**
 * @description     Удаляет кабинет пользователя.    ### Особенности:    - Если удаляется активный кабинет, активным становится другой кабинет пользователя    - Если у пользователя нет других кабинетов, activeCabinetId сбрасывается    - Удаление кабинета не удаляет пользователя
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
 * @description     Удаляет кабинет пользователя.    ### Особенности:    - Если удаляется активный кабинет, активным становится другой кабинет пользователя    - Если у пользователя нет других кабинетов, activeCabinetId сбрасывается    - Удаление кабинета не удаляет пользователя
 * @summary Удаление кабинета
 * {@link /cabinets/:id}
 */
export function useCabinetsRemove<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CabinetsRemoveMutationResponseType,
      ResponseErrorConfig<CabinetsRemove404Type>,
      { id: CabinetsRemovePathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsRemoveMutationKey()

  return useMutation<CabinetsRemoveMutationResponseType, ResponseErrorConfig<CabinetsRemove404Type>, { id: CabinetsRemovePathParamsType['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return cabinetsRemove(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}