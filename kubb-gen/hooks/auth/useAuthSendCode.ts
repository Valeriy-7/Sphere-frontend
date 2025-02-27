import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  AuthSendCodeMutationRequestType,
  AuthSendCodeMutationResponseType,
  AuthSendCode400Type,
  AuthSendCode429Type,
} from '../../types/auth/AuthSendCodeType';
import { useMutation } from '@tanstack/react-query';

export const authSendCodeMutationKey = () => [{ url: '/auth/send-code' }] as const;

export type AuthSendCodeMutationKey = ReturnType<typeof authSendCodeMutationKey>;

/**
 * @description     Отправляет SMS с кодом подтверждения на указанный номер телефона.    ### Процесс:    1. Генерируется 4-значный код подтверждения    2. В режиме разработки (IS_DEVELOPMENT=true):       - Используется фиксированный код 1234 (или указанный в DEV_VERIFICATION_CODE)       - Код выводится в консоль вместо отправки SMS    3. В продакшен режиме:       - Генерируется случайный код       - Код отправляется в SMS на указанный номер    4. Код действителен в течение 5 минут    ### Ограничения:    - Номер телефона должен быть в формате +7XXXXXXXXXX    - Повторная отправка кода возможна не чаще чем раз в минуту
 * @summary Отправка кода подтверждения
 * {@link /auth/send-code}
 */
export async function authSendCode(
  data: AuthSendCodeMutationRequestType,
  config: Partial<RequestConfig<AuthSendCodeMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AuthSendCodeMutationResponseType,
    ResponseErrorConfig<AuthSendCode400Type | AuthSendCode429Type>,
    AuthSendCodeMutationRequestType
  >({
    method: 'POST',
    url: `/auth/send-code`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description     Отправляет SMS с кодом подтверждения на указанный номер телефона.    ### Процесс:    1. Генерируется 4-значный код подтверждения    2. В режиме разработки (IS_DEVELOPMENT=true):       - Используется фиксированный код 1234 (или указанный в DEV_VERIFICATION_CODE)       - Код выводится в консоль вместо отправки SMS    3. В продакшен режиме:       - Генерируется случайный код       - Код отправляется в SMS на указанный номер    4. Код действителен в течение 5 минут    ### Ограничения:    - Номер телефона должен быть в формате +7XXXXXXXXXX    - Повторная отправка кода возможна не чаще чем раз в минуту
 * @summary Отправка кода подтверждения
 * {@link /auth/send-code}
 */
export function useAuthSendCode(
  options: {
    mutation?: UseMutationOptions<
      AuthSendCodeMutationResponseType,
      ResponseErrorConfig<AuthSendCode400Type | AuthSendCode429Type>,
      { data: AuthSendCodeMutationRequestType }
    >;
    client?: Partial<RequestConfig<AuthSendCodeMutationRequestType>> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? authSendCodeMutationKey();

  return useMutation<
    AuthSendCodeMutationResponseType,
    ResponseErrorConfig<AuthSendCode400Type | AuthSendCode429Type>,
    { data: AuthSendCodeMutationRequestType }
  >({
    mutationFn: async ({ data }) => {
      return authSendCode(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
