import client from '@/modules/auth/axios-client'
import type {
  CabinetsClearAllWildberriesLegalNamesMutationResponseType,
  CabinetsClearAllWildberriesLegalNames400Type,
} from '../../types/cabinets/CabinetsClearAllWildberriesLegalNamesType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const cabinetsClearAllWildberriesLegalNamesMutationKey = () => [{ url: '/cabinets/wb/clear-all-legal-names' }] as const

export type CabinetsClearAllWildberriesLegalNamesMutationKey = ReturnType<typeof cabinetsClearAllWildberriesLegalNamesMutationKey>

/**
 * @description     Очищает значение юридического наименования (legalCompanyName) для всех кабинетов типа Wildberries.    ### Особенности:    - Применяется для всех кабинетов типа Wildberries    - Устанавливает значение legalCompanyName в null
 * @summary Очистка поля legalCompanyName во всех кабинетах Wildberries
 * {@link /cabinets/wb/clear-all-legal-names}
 */
export async function cabinetsClearAllWildberriesLegalNames(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CabinetsClearAllWildberriesLegalNamesMutationResponseType,
    ResponseErrorConfig<CabinetsClearAllWildberriesLegalNames400Type>,
    unknown
  >({ method: 'PUT', url: `/cabinets/wb/clear-all-legal-names`, ...requestConfig })
  return res.data
}

/**
 * @description     Очищает значение юридического наименования (legalCompanyName) для всех кабинетов типа Wildberries.    ### Особенности:    - Применяется для всех кабинетов типа Wildberries    - Устанавливает значение legalCompanyName в null
 * @summary Очистка поля legalCompanyName во всех кабинетах Wildberries
 * {@link /cabinets/wb/clear-all-legal-names}
 */
export function useCabinetsClearAllWildberriesLegalNames<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CabinetsClearAllWildberriesLegalNamesMutationResponseType,
      ResponseErrorConfig<CabinetsClearAllWildberriesLegalNames400Type>,
      undefined,
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsClearAllWildberriesLegalNamesMutationKey()

  return useMutation<
    CabinetsClearAllWildberriesLegalNamesMutationResponseType,
    ResponseErrorConfig<CabinetsClearAllWildberriesLegalNames400Type>,
    undefined,
    TContext
  >({
    mutationFn: async () => {
      return cabinetsClearAllWildberriesLegalNames(config)
    },
    mutationKey,
    ...mutationOptions,
  })
}