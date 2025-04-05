import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AuthSendCodeMutationRequestType, AuthSendCodeMutationResponseType, AuthSendCode400Type } from '../../types/auth/AuthSendCodeType'
import { useMutation } from '@tanstack/react-query'

export const authSendCodeMutationKey = () => [{ url: '/auth/send-code' }] as const

export type AuthSendCodeMutationKey = ReturnType<typeof authSendCodeMutationKey>

/**
 * @description     Отправляет SMS-код подтверждения на указанный номер телефона.    ### Примечания:    - Номер телефона должен быть в формате +7XXXXXXXXXX    - Код подтверждения будет отправлен по SMS    - В режиме разработки код будет выведен в консоль сервера    - Подтвердить код необходимо в течение 5 минут
 * @summary Отправка кода подтверждения
 * {@link /auth/send-code}
 */
export async function authSendCode(
  data: AuthSendCodeMutationRequestType,
  config: Partial<RequestConfig<AuthSendCodeMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AuthSendCodeMutationResponseType, ResponseErrorConfig<AuthSendCode400Type>, AuthSendCodeMutationRequestType>({
    method: 'POST',
    url: `/auth/send-code`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description     Отправляет SMS-код подтверждения на указанный номер телефона.    ### Примечания:    - Номер телефона должен быть в формате +7XXXXXXXXXX    - Код подтверждения будет отправлен по SMS    - В режиме разработки код будет выведен в консоль сервера    - Подтвердить код необходимо в течение 5 минут
 * @summary Отправка кода подтверждения
 * {@link /auth/send-code}
 */
export function useAuthSendCode<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthSendCodeMutationResponseType,
      ResponseErrorConfig<AuthSendCode400Type>,
      { data: AuthSendCodeMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<AuthSendCodeMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? authSendCodeMutationKey()

  return useMutation<AuthSendCodeMutationResponseType, ResponseErrorConfig<AuthSendCode400Type>, { data: AuthSendCodeMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return authSendCode(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}