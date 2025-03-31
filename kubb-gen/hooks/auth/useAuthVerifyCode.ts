import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  AuthVerifyCodeMutationRequestType,
  AuthVerifyCodeMutationResponseType,
  AuthVerifyCode400Type,
  AuthVerifyCode404Type,
} from '../../types/auth/AuthVerifyCodeType'
import { useMutation } from '@tanstack/react-query'

export const authVerifyCodeMutationKey = () => [{ url: '/auth/verify-code' }] as const

export type AuthVerifyCodeMutationKey = ReturnType<typeof authVerifyCodeMutationKey>

/**
 * @description     Проверяет код подтверждения и возвращает JWT токен для авторизации.    ### Процесс:    1. Проверяется корректность кода для указанного номера    2. При успешной проверке:       - Если пользователь новый - создается аккаунт       - Генерируется JWT токен (срок действия 30 дней)    3. Возвращается токен и информация о пользователе    ### Статусы регистрации:    - INCOMPLETE: нет кабинетов    - COMPLETE: есть кабинет    - VERIFIED: есть верифицированный кабинет
 * @summary Проверка кода подтверждения
 * {@link /auth/verify-code}
 */
export async function authVerifyCode(
  data: AuthVerifyCodeMutationRequestType,
  config: Partial<RequestConfig<AuthVerifyCodeMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    AuthVerifyCodeMutationResponseType,
    ResponseErrorConfig<AuthVerifyCode400Type | AuthVerifyCode404Type>,
    AuthVerifyCodeMutationRequestType
  >({ method: 'POST', url: `/auth/verify-code`, data, ...requestConfig })
  return res.data
}

/**
 * @description     Проверяет код подтверждения и возвращает JWT токен для авторизации.    ### Процесс:    1. Проверяется корректность кода для указанного номера    2. При успешной проверке:       - Если пользователь новый - создается аккаунт       - Генерируется JWT токен (срок действия 30 дней)    3. Возвращается токен и информация о пользователе    ### Статусы регистрации:    - INCOMPLETE: нет кабинетов    - COMPLETE: есть кабинет    - VERIFIED: есть верифицированный кабинет
 * @summary Проверка кода подтверждения
 * {@link /auth/verify-code}
 */
export function useAuthVerifyCode<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthVerifyCodeMutationResponseType,
      ResponseErrorConfig<AuthVerifyCode400Type | AuthVerifyCode404Type>,
      { data: AuthVerifyCodeMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<AuthVerifyCodeMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? authVerifyCodeMutationKey()

  return useMutation<
    AuthVerifyCodeMutationResponseType,
    ResponseErrorConfig<AuthVerifyCode400Type | AuthVerifyCode404Type>,
    { data: AuthVerifyCodeMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return authVerifyCode(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}