import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  CabinetsUpdateMutationRequestType,
  CabinetsUpdateMutationResponseType,
  CabinetsUpdatePathParamsType,
  CabinetsUpdate404Type,
} from '../../types/cabinets/CabinetsUpdateType';
import { useMutation } from '@tanstack/react-query';

export const cabinetsUpdateMutationKey = () => [{ url: '/cabinets/{id}' }] as const;

export type CabinetsUpdateMutationKey = ReturnType<typeof cabinetsUpdateMutationKey>;

/**
 * @description     Обновляет настройки и данные кабинета.    ### Обновляемые поля:    - Контактная информация (телефон, email)    - Мессенджеры (Telegram, WhatsApp)    - Банковские реквизиты    - Фактический адрес    - ФИО управляющего    ### Особенности:    - Некоторые поля недоступны для обновления (тип, ИНН)    - При изменении БИК автоматически обновляются банковские реквизиты    - Верификация не сбрасывается при обновлении
 * @summary Обновление настроек кабинета
 * {@link /cabinets/:id}
 */
export async function cabinetsUpdate(
  id: CabinetsUpdatePathParamsType['id'],
  data?: CabinetsUpdateMutationRequestType,
  config: Partial<RequestConfig<CabinetsUpdateMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CabinetsUpdateMutationResponseType,
    ResponseErrorConfig<CabinetsUpdate404Type>,
    CabinetsUpdateMutationRequestType
  >({
    method: 'PUT',
    url: `/cabinets/${id}`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description     Обновляет настройки и данные кабинета.    ### Обновляемые поля:    - Контактная информация (телефон, email)    - Мессенджеры (Telegram, WhatsApp)    - Банковские реквизиты    - Фактический адрес    - ФИО управляющего    ### Особенности:    - Некоторые поля недоступны для обновления (тип, ИНН)    - При изменении БИК автоматически обновляются банковские реквизиты    - Верификация не сбрасывается при обновлении
 * @summary Обновление настроек кабинета
 * {@link /cabinets/:id}
 */
export function useCabinetsUpdate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CabinetsUpdateMutationResponseType,
      ResponseErrorConfig<CabinetsUpdate404Type>,
      { id: CabinetsUpdatePathParamsType['id']; data?: CabinetsUpdateMutationRequestType },
      TContext
    >;
    client?: Partial<RequestConfig<CabinetsUpdateMutationRequestType>> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsUpdateMutationKey();

  return useMutation<
    CabinetsUpdateMutationResponseType,
    ResponseErrorConfig<CabinetsUpdate404Type>,
    { id: CabinetsUpdatePathParamsType['id']; data?: CabinetsUpdateMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return cabinetsUpdate(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
