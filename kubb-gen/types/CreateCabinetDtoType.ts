export const createCabinetDtoTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const

export type CreateCabinetDtoTypeEnumType = (typeof createCabinetDtoTypeEnum)[keyof typeof createCabinetDtoTypeEnum]

export type CreateCabinetDtoType = {
  /**
   * @description Тип организации
   * @type string
   */
  type?: CreateCabinetDtoTypeEnumType | null
  /**
   * @description ИНН компании
   * @type string
   */
  inn: string
  /**
   * @description API ключ (обязателен для Wildberries)
   * @type string | undefined
   */
  apiKey?: string
  /**
   * @description Флаг ручного заполнения данных
   * @type boolean | undefined
   */
  isManualFilling?: boolean
  /**
   * @description Название компании для отображения
   * @type string | undefined
   */
  companyName?: string
  /**
   * @description ОГРН компании
   * @type string | undefined
   */
  ogrn?: string
  /**
   * @description Юридический адрес
   * @type string | undefined
   */
  legalAddress?: string
  /**
   * @description Фактический адрес
   * @type string | undefined
   */
  actualAddress?: string
  /**
   * @description ФИО управляющего
   * @type string | undefined
   */
  managerFullName?: string
  /**
   * @description Телефон компании
   * @type string | undefined
   */
  companyPhone?: string
  /**
   * @description Email компании
   * @type string | undefined
   */
  companyEmail?: string
  /**
   * @description Токен партнера (из ссылки регистрации)
   * @type string | undefined
   */
  partnerToken?: string
}