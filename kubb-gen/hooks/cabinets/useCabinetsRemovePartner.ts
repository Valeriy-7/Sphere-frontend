import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  CabinetsRemovePartnerMutationResponseType,
  CabinetsRemovePartnerPathParamsType,
  CabinetsRemovePartner400Type,
  CabinetsRemovePartner404Type,
} from '../../types/cabinets/CabinetsRemovePartnerType'
import { useMutation } from '@tanstack/react-query'

export const cabinetsRemovePartnerMutationKey = () => [{ url: '/cabinets/partners/{partnerId}' }] as const

export type CabinetsRemovePartnerMutationKey = ReturnType<typeof cabinetsRemovePartnerMutationKey>

/**
 * @description Удаляет партнера из активного кабинета пользователя
 * @summary Удаление партнера из кабинета
 * {@link /cabinets/partners/:partnerId}
 */
export async function cabinetsRemovePartner(
  partnerId: CabinetsRemovePartnerPathParamsType['partnerId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    CabinetsRemovePartnerMutationResponseType,
    ResponseErrorConfig<CabinetsRemovePartner400Type | CabinetsRemovePartner404Type>,
    unknown
  >({ method: 'DELETE', url: `/cabinets/partners/${partnerId}`, ...requestConfig })
  return res.data
}

/**
 * @description Удаляет партнера из активного кабинета пользователя
 * @summary Удаление партнера из кабинета
 * {@link /cabinets/partners/:partnerId}
 */
export function useCabinetsRemovePartner<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CabinetsRemovePartnerMutationResponseType,
      ResponseErrorConfig<CabinetsRemovePartner400Type | CabinetsRemovePartner404Type>,
      { partnerId: CabinetsRemovePartnerPathParamsType['partnerId'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsRemovePartnerMutationKey()

  return useMutation<
    CabinetsRemovePartnerMutationResponseType,
    ResponseErrorConfig<CabinetsRemovePartner400Type | CabinetsRemovePartner404Type>,
    { partnerId: CabinetsRemovePartnerPathParamsType['partnerId'] },
    TContext
  >({
    mutationFn: async ({ partnerId }) => {
      return cabinetsRemovePartner(partnerId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}