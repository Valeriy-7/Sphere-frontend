import client from '@/modules/auth/axios-client'
import type {
  CabinetsClearLegalNameMutationResponseType,
  CabinetsClearLegalNamePathParamsType,
  CabinetsClearLegalName400Type,
} from '../../types/cabinets/CabinetsClearLegalNameType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const cabinetsClearLegalNameMutationKey = () => [{ url: '/cabinets/{id}/clear-legal-name' }] as const

export type CabinetsClearLegalNameMutationKey = ReturnType<typeof cabinetsClearLegalNameMutationKey>

/**
 * @description     Очищает значение юридического наименования (legalCompanyName) для кабинета Wildberries.    ### Особенности:    - Применимо только для кабинетов типа Wildberries    - Устанавливает значение legalCompanyName в null
 * @summary Очистка поля legalCompanyName
 * {@link /cabinets/:id/clear-legal-name}
 */
export async function cabinetsClearLegalName(id: CabinetsClearLegalNamePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsClearLegalNameMutationResponseType, ResponseErrorConfig<CabinetsClearLegalName400Type>, unknown>({
    method: 'PUT',
    url: `/cabinets/${id}/clear-legal-name`,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description     Очищает значение юридического наименования (legalCompanyName) для кабинета Wildberries.    ### Особенности:    - Применимо только для кабинетов типа Wildberries    - Устанавливает значение legalCompanyName в null
 * @summary Очистка поля legalCompanyName
 * {@link /cabinets/:id/clear-legal-name}
 */
export function useCabinetsClearLegalName<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CabinetsClearLegalNameMutationResponseType,
      ResponseErrorConfig<CabinetsClearLegalName400Type>,
      { id: CabinetsClearLegalNamePathParamsType['id'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsClearLegalNameMutationKey()

  return useMutation<
    CabinetsClearLegalNameMutationResponseType,
    ResponseErrorConfig<CabinetsClearLegalName400Type>,
    { id: CabinetsClearLegalNamePathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return cabinetsClearLegalName(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}