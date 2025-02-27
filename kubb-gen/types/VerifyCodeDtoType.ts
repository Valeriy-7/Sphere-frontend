export type VerifyCodeDtoType = {
  /**
   * @description Номер телефона пользователя в международном формате
   * @minLength 12
   * @maxLength 12
   * @pattern \+7[0-9]{10}
   * @type string
   */
  phone: string;
  /**
   * @description Код подтверждения из SMS (4 цифры)
   * @minLength 4
   * @maxLength 4
   * @pattern [0-9]{4}
   * @type string
   */
  code: string;
};
