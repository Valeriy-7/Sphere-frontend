import type { UserTypeType } from './UserTypeType'

export type CompleteRegistrationDtoType = {
  /**
   * @description Тип кабинета (продавец Wildberries или фулфилмент)
   */
  type: UserTypeType
  /**
   * @description API ключ Wildberries (обязательное поле для продавцов Wildberries)
   * @minLength 32
   * @type string | undefined
   */
  apiKey?: string
  /**
   * @description ИНН компании (обязательное поле для фулфилмента)
   * @pattern ^\d{10}$|^\d{12}$
   * @type string | undefined
   */
  inn?: string
}