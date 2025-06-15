export const deliveryGroupDetailDtoStatusEnum = {
  new: 'new',
  reception: 'reception',
  accepted: 'accepted',
  preparation: 'preparation',
  to_work: 'to_work',
  completed: 'completed',
} as const

export type DeliveryGroupDetailDtoStatusEnumType = (typeof deliveryGroupDetailDtoStatusEnum)[keyof typeof deliveryGroupDetailDtoStatusEnum]

export const deliveriesStatusEnum = {
  new: 'new',
  reception: 'reception',
  accepted: 'accepted',
  preparation: 'preparation',
  to_work: 'to_work',
  completed: 'completed',
} as const

export type DeliveriesStatusEnumType = (typeof deliveriesStatusEnum)[keyof typeof deliveriesStatusEnum]

export type DeliveryGroupDetailDtoType = {
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
  status: DeliveryGroupDetailDtoStatusEnumType
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
  /**
   * @description Список поставок в группе
   * @type array
   */
  deliveries: {
    /**
     * @type string | undefined
     */
    id?: string
    /**
     * @type string | undefined
     */
    deliveryNumber?: string
    /**
     * @type string | undefined, date
     */
    deliveryDate?: string
    /**
     * @type string | undefined
     */
    status?: DeliveriesStatusEnumType
    /**
     * @type number | undefined
     */
    cargoPlaces?: number
    /**
     * @type object | undefined
     */
    cabinet?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type string | undefined
       */
      name?: string
      /**
       * @type string | undefined
       */
      legalCompanyName?: string
    }
  }[]
}