export type CreateLogisticsTypeDtoType = {
  /**
   * @description Название типа логистики
   * @type string
   */
  name: string
  /**
   * @description Имя контактного лица
   * @type string | undefined
   */
  contactName?: string
  /**
   * @description Телефон контактного лица
   * @type string | undefined
   */
  contactPhone?: string
  /**
   * @description Модель автомобиля
   * @type string | undefined
   */
  carModel?: string
  /**
   * @description Государственный номер автомобиля
   * @type string | undefined
   */
  carNumber?: string
  /**
   * @description Вместимость (объем) в кубических метрах
   * @type number | undefined
   */
  capacity?: number
  /**
   * @description Telegram контакт
   * @type string | undefined
   */
  telegramContact?: string
  /**
   * @description Тип логистики
   * @type string | undefined
   */
  logisticsType?: string
}