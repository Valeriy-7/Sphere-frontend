import type { SendCodeDtoType } from '../SendCodeDtoType'

/**
 * @description Код успешно отправлен
 */
export type AuthSendCode200Type = any

/**
 * @description Некорректный формат номера телефона
 */
export type AuthSendCode400Type = any

/**
 * @description Слишком частые запросы. Попробуйте позже
 */
export type AuthSendCode429Type = any

/**
 * @description Данные для отправки кода
 */
export type AuthSendCodeMutationRequestType = SendCodeDtoType

export type AuthSendCodeMutationResponseType = AuthSendCode200Type

export type AuthSendCodeTypeMutation = {
  Response: AuthSendCode200Type
  Request: AuthSendCodeMutationRequestType
  Errors: AuthSendCode400Type | AuthSendCode429Type
}