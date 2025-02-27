import type { AuthUserDataDtoType } from './AuthUserDataDtoType';

export type AuthResponseDtoType = {
  /**
   * @description JWT токен для авторизации (срок действия 30 дней)
   * @type string
   */
  token: string;
  /**
   * @description Данные пользователя
   */
  user: AuthUserDataDtoType;
};
