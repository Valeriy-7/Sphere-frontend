import client from '@/modules/auth/axios-client'
import type {
  AuthCompleteRegistrationMutationRequestType,
  AuthCompleteRegistrationMutationResponseType,
  AuthCompleteRegistration400Type,
  AuthCompleteRegistration401Type,
} from '../../types/auth/AuthCompleteRegistrationType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const authCompleteRegistrationMutationKey = () => [{ url: '/auth/complete' }] as const

export type AuthCompleteRegistrationMutationKey = ReturnType<typeof authCompleteRegistrationMutationKey>

/**
 * @description     Создает кабинет пользователя после авторизации.    ### Требования к параметрам:    - type: обязательное поле, допустимые значения "wildberries" или "fulfillment"    - apiKey: обязательное поле для type="wildberries"    - inn: обязательное поле только для type="fulfillment"    - token: опциональное поле для связи с партнерским кабинетом
 * @summary Завершение регистрации
 * {@link /auth/complete}
 */
export async function authCompleteRegistration(
  data: AuthCompleteRegistrationMutationRequestType,
  config: Partial<RequestConfig<AuthCompleteRegistrationMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    AuthCompleteRegistrationMutationResponseType,
    ResponseErrorConfig<AuthCompleteRegistration400Type | AuthCompleteRegistration401Type>,
    AuthCompleteRegistrationMutationRequestType
  >({ method: 'POST', url: `/auth/complete`, data, ...requestConfig })
  return res.data
}

/**
 * @description     Создает кабинет пользователя после авторизации.    ### Требования к параметрам:    - type: обязательное поле, допустимые значения "wildberries" или "fulfillment"    - apiKey: обязательное поле для type="wildberries"    - inn: обязательное поле только для type="fulfillment"    - token: опциональное поле для связи с партнерским кабинетом
 * @summary Завершение регистрации
 * {@link /auth/complete}
 */
export function useAuthCompleteRegistration<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AuthCompleteRegistrationMutationResponseType,
      ResponseErrorConfig<AuthCompleteRegistration400Type | AuthCompleteRegistration401Type>,
      { data: AuthCompleteRegistrationMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<AuthCompleteRegistrationMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? authCompleteRegistrationMutationKey()

  return useMutation<
    AuthCompleteRegistrationMutationResponseType,
    ResponseErrorConfig<AuthCompleteRegistration400Type | AuthCompleteRegistration401Type>,
    { data: AuthCompleteRegistrationMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return authCompleteRegistration(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}