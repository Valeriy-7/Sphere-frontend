export type LogisticsProviderListItemDtoType = {
  /**
   * @description ID логиста
   * @type string, uuid
   */
  id: string
  /**
   * @description Название компании логиста
   * @type string
   */
  name: string
  /**
   * @description Имя контактного лица
   * @type string
   */
  contactName: string
  /**
   * @description Контактный телефон
   * @type string
   */
  phone: string
  /**
   * @description Модель автомобиля
   * @type string | undefined
   */
  carModel?: string
  /**
   * @description Номер автомобиля
   * @type string | undefined
   */
  carNumber?: string
  /**
   * @description Telegram аккаунт
   * @type string | undefined
   */
  telegram?: string
}