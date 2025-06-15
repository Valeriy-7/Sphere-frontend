export const deliveryGroupListItemDtoStatusEnum = {
  new: 'new',
  reception: 'reception',
  accepted: 'accepted',
  preparation: 'preparation',
  to_work: 'to_work',
  completed: 'completed',
} as const

export type DeliveryGroupListItemDtoStatusEnumType = (typeof deliveryGroupListItemDtoStatusEnum)[keyof typeof deliveryGroupListItemDtoStatusEnum]

export type DeliveryGroupListItemDtoType = {
  /**
   * @description ID группы поставок
   * @type string
   */
  id: string
  /**
   * @description Название группы
   * @type string
   */
  groupName: string | null
  /**
   * @description Статус группы
   * @type string
   */
  status: DeliveryGroupListItemDtoStatusEnumType
  /**
   * @description Количество поставок в группе
   * @type number
   */
  totalDeliveries: number
  /**
   * @description Общее количество грузовых мест
   * @type number
   */
  totalCargoPlaces: number
  /**
   * @description Дата создания группы
   * @type string, date-time
   */
  createdAt: string
  /**
   * @description Дата отправки в приемку
   * @type string, date-time
   */
  sentToReceptionAt: string | null
  /**
   * @description Дата принятия
   * @type string, date-time
   */
  acceptedAt: string | null
  /**
   * @description Информация о создателе группы
   * @type object
   */
  createdBy: object | null
}