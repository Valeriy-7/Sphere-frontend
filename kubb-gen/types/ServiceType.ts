export const serviceTypeEnum = {
  service: 'service',
  logistics: 'logistics',
  consumable: 'consumable',
} as const

export type ServiceTypeEnumType = (typeof serviceTypeEnum)[keyof typeof serviceTypeEnum]

export type ServiceType = {
  /**
   * @description ID услуги
   * @type string
   */
  id: string
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
  /**
   * @description Порядковый номер
   * @type number
   */
  number: number
  /**
   * @description Название услуги
   * @type string
   */
  name: string
  /**
   * @description URL изображения
   * @type string
   */
  imageUrl: string
  /**
   * @description Цена за единицу
   * @type number
   */
  price: number
  /**
   * @description Описание услуги
   * @type string
   */
  description: string
  /**
   * @description Тип услуги (услуга/логистика/расходник)
   * @type string
   */
  type: ServiceTypeEnumType
}