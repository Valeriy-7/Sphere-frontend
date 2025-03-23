import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  CabinetsAddPartnerMutationResponseType,
  CabinetsAddPartnerPathParamsType,
  CabinetsAddPartner400Type,
  CabinetsAddPartner404Type,
} from '../../types/cabinets/CabinetsAddPartnerType';
import { useMutation } from '@tanstack/react-query';

export const cabinetsAddPartnerMutationKey = () =>
  [{ url: '/cabinets/partners/{partnerId}' }] as const;

export type CabinetsAddPartnerMutationKey = ReturnType<typeof cabinetsAddPartnerMutationKey>;

/**
 * @description Добавляет партнера к активному кабинету пользователя
 * @summary Добавление партнера к кабинету
 * {@link /cabinets/partners/:partnerId}
 */
export async function cabinetsAddPartner(
  partnerId: CabinetsAddPartnerPathParamsType['partnerId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CabinetsAddPartnerMutationResponseType,
    ResponseErrorConfig<CabinetsAddPartner400Type | CabinetsAddPartner404Type>,
    unknown
  >({
    method: 'POST',
    url: `/cabinets/partners/${partnerId}`,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Добавляет партнера к активному кабинету пользователя
 * @summary Добавление партнера к кабинету
 * {@link /cabinets/partners/:partnerId}
 */
export function useCabinetsAddPartner<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CabinetsAddPartnerMutationResponseType,
      ResponseErrorConfig<CabinetsAddPartner400Type | CabinetsAddPartner404Type>,
      { partnerId: CabinetsAddPartnerPathParamsType['partnerId'] },
      TContext
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsAddPartnerMutationKey();

  return useMutation<
    CabinetsAddPartnerMutationResponseType,
    ResponseErrorConfig<CabinetsAddPartner400Type | CabinetsAddPartner404Type>,
    { partnerId: CabinetsAddPartnerPathParamsType['partnerId'] },
    TContext
  >({
    mutationFn: async ({ partnerId }) => {
      return cabinetsAddPartner(partnerId, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
