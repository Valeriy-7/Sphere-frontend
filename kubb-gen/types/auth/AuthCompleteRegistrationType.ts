import type { CompleteRegistrationDtoType } from '../CompleteRegistrationDtoType'
import type { CompleteRegistrationResponseDtoType } from '../CompleteRegistrationResponseDtoType'

/**
 * @description Регистрация успешно завершена
 */
export type AuthCompleteRegistration201Type = CompleteRegistrationResponseDtoType

/**
 * @description Некорректные данные для регистрации
 */
export type AuthCompleteRegistration400Type = {
  /**
   * @type string | undefined
   */
  message?: string
  /**
   * @type string | undefined
   */
  error?: string
  /**
   * @type number | undefined
   */
  statusCode?: number
}

/**
 * @description Пользователь не авторизован
 */
export type AuthCompleteRegistration401Type = any

/**
 * @description Данные для завершения регистрации
 */
export type AuthCompleteRegistrationMutationRequestType = CompleteRegistrationDtoType

export type AuthCompleteRegistrationMutationResponseType = AuthCompleteRegistration201Type

export type AuthCompleteRegistrationTypeMutation = {
  Response: AuthCompleteRegistration201Type
  Request: AuthCompleteRegistrationMutationRequestType
  Errors: AuthCompleteRegistration400Type | AuthCompleteRegistration401Type
}