import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  CabinetsSetActiveMutationRequestType,
  CabinetsSetActiveMutationResponseType,
  CabinetsSetActivePathParamsType,
  CabinetsSetActive404Type,
} from '../../types/cabinets/CabinetsSetActiveType';
import { useMutation } from '@tanstack/react-query';

export const cabinetsSetActiveMutationKey = () => [{ url: '/cabinets/{id}/activate' }] as const;

export type CabinetsSetActiveMutationKey = ReturnType<typeof cabinetsSetActiveMutationKey>;

/**
 * @description     Устанавливает кабинет как активный для пользователя.    ### Процесс активации:    1. Проверка существования кабинета    2. Деактивация текущего активного кабинета    3. Активация выбранного кабинета    4. Обновление настроек пользователя    ### Особенности:    - У пользователя может быть только один активный кабинет    - Активным может быть как верифицированный, так и неверифицированный кабинет
 * @summary Активация кабинета
 * {@link /cabinets/:id/activate}
 */
export async function cabinetsSetActive(
  id: CabinetsSetActivePathParamsType['id'],
  data?: CabinetsSetActiveMutationRequestType,
  config: Partial<RequestConfig<CabinetsSetActiveMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CabinetsSetActiveMutationResponseType,
    ResponseErrorConfig<CabinetsSetActive404Type>,
    CabinetsSetActiveMutationRequestType
  >({
    method: 'PUT',
    url: `/cabinets/${id}/activate`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description     Устанавливает кабинет как активный для пользователя.    ### Процесс активации:    1. Проверка существования кабинета    2. Деактивация текущего активного кабинета    3. Активация выбранного кабинета    4. Обновление настроек пользователя    ### Особенности:    - У пользователя может быть только один активный кабинет    - Активным может быть как верифицированный, так и неверифицированный кабинет
 * @summary Активация кабинета
 * {@link /cabinets/:id/activate}
 */
export function useCabinetsSetActive(
  options: {
    mutation?: UseMutationOptions<
      CabinetsSetActiveMutationResponseType,
      ResponseErrorConfig<CabinetsSetActive404Type>,
      { id: CabinetsSetActivePathParamsType['id']; data?: CabinetsSetActiveMutationRequestType }
    >;
    client?: Partial<RequestConfig<CabinetsSetActiveMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsSetActiveMutationKey();

  return useMutation<
    CabinetsSetActiveMutationResponseType,
    ResponseErrorConfig<CabinetsSetActive404Type>,
    { id: CabinetsSetActivePathParamsType['id']; data?: CabinetsSetActiveMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return cabinetsSetActive(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
