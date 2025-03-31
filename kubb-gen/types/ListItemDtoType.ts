export const listItemDtoTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const

export type ListItemDtoTypeEnumType = (typeof listItemDtoTypeEnum)[keyof typeof listItemDtoTypeEnum]

export const listItemDtoStatusEnum = {
  VERIFIED: 'VERIFIED',
  UNVERIFIED: 'UNVERIFIED',
  PENDING: 'PENDING',
  BLOCKED: 'BLOCKED',
} as const

export type ListItemDtoStatusEnumType = (typeof listItemDtoStatusEnum)[keyof typeof listItemDtoStatusEnum]

export type ListItemDtoType = {
  /**
   * @description ID записи (кабинета или пользователя)
   * @type string
   */
  id: string
  /**
   * @description ID пользователя
   * @type string
   */
  userId: string
  /**
   * @description Номер первого уровня
   * @type string
   */
  number1: string
  /**
   * @description ФИО
   * @type string
   */
  fullName: string
  /**
   * @description Номер телефона
   * @type string
   */
  phone: string
  /**
   * @description Номер второго уровня
   * @type string
   */
  number2: string
  /**
   * @description Тип организации
   * @type string
   */
  type: ListItemDtoTypeEnumType
  /**
   * @description ИНН
   * @type string
   */
  inn: string
  /**
   * @description Название организации
   * @type string
   */
  companyName: string
  /**
   * @description Дата создания
   * @type string
   */
  createAt: string
  /**
   * @description Статус
   * @type string
   */
  status: ListItemDtoStatusEnumType
}