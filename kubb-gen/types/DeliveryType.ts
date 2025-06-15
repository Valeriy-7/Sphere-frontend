export const deliveryStatusEnum = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  ACCEPTED: 'ACCEPTED',
  PREPARATION: 'PREPARATION',
  TO_WORK: 'TO_WORK',
  COMPLETED: 'COMPLETED',
} as const

export type DeliveryStatusEnumType = (typeof deliveryStatusEnum)[keyof typeof deliveryStatusEnum]

export type DeliveryType = {
  /**
   * @description Уникальный идентификатор поставки
   * @type string
   */
  id: string
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
  /**
   * @description Дата поставки
   * @type string, date-time
   */
  deliveryDate: string
  /**
   * @description Количество грузовых мест
   * @type number | undefined
   */
  cargoPlaces?: number
  /**
   * @description Ширина груза (см)
   * @type number | undefined
   */
  cargoWidth?: number
  /**
   * @description Длина груза (см)
   * @type number | undefined
   */
  cargoLength?: number
  /**
   * @description Высота груза (см)
   * @type number | undefined
   */
  cargoHeight?: number
  /**
   * @description Объем груза (м³)
   * @type number | undefined
   */
  cargoVolume?: number
  /**
   * @description Ответственный сотрудник
   * @type string | undefined
   */
  responsiblePerson?: string
  /**
   * @description ID логиста
   * @type string | undefined
   */
  logisticsProviderId?: string
  /**
   * @description Статус поставки
   * @type string
   */
  status: DeliveryStatusEnumType
  /**
   * @description ID магазина
   * @type string | undefined
   */
  storeId?: string
  /**
   * @description Название магазина
   * @type string | undefined
   */
  storeName?: string
  /**
   * @description Контактное лицо магазина
   * @type string | undefined
   */
  storeContactPerson?: string
  /**
   * @description Контактный телефон магазина
   * @type string | undefined
   */
  storeContactPhone?: string
  /**
   * @description Время работы магазина
   * @type string | undefined
   */
  storeWorkingHours?: string
  /**
   * @description Идентификатор магазина в системе
   * @type string | undefined
   */
  storeExternalId?: string
  /**
   * @description Общая стоимость товаров
   * @type number
   */
  totalProductsPrice: number
  /**
   * @description Стоимость логистики до фулфилмента
   * @type number
   */
  logisticsToFFPrice: number
  /**
   * @description Стоимость услуг фулфилмента
   * @type number
   */
  ffServicesPrice: number
  /**
   * @description Итоговая сумма
   * @type number
   */
  totalAmount: number
  /**
   * @description Дата и время принятия поставки
   * @type string | undefined, date-time
   */
  acceptedAt?: string
  /**
   * @description Дата создания записи
   * @type string, date-time
   */
  createdAt: string
  /**
   * @description Дата последнего обновления записи
   * @type string, date-time
   */
  updatedAt: string
}