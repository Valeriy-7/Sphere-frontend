import type { AuthResponseDtoType } from '../AuthResponseDtoType';
import type { VerifyCodeDtoType } from '../VerifyCodeDtoType';

/**
 * @description Код успешно подтвержден
 */
export type AuthVerifyCode200Type = AuthResponseDtoType;

/**
 * @description Некорректный код или формат номера телефона
 */
export type AuthVerifyCode400Type = any;

/**
 * @description Код не найден или истек срок его действия
 */
export type AuthVerifyCode404Type = any;

/**
 * @description Данные для проверки кода
 */
export type AuthVerifyCodeMutationRequestType = VerifyCodeDtoType;

export type AuthVerifyCodeMutationResponseType = AuthVerifyCode200Type;

export type AuthVerifyCodeTypeMutation = {
  Response: AuthVerifyCode200Type;
  Request: AuthVerifyCodeMutationRequestType;
  Errors: AuthVerifyCode400Type | AuthVerifyCode404Type;
};
