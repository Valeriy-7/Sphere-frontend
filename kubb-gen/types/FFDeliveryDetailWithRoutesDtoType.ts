import type { RouteDtoType } from './RouteDtoType'

export const FFDeliveryDetailWithRoutesDtoStatusEnum = {
  new: 'new',
  reception: 'reception',
  accepted: 'accepted',
  preparation: 'preparation',
  to_work: 'to_work',
  completed: 'completed',
} as const

export type FFDeliveryDetailWithRoutesDtoStatusEnumType = (typeof FFDeliveryDetailWithRoutesDtoStatusEnum)[keyof typeof FFDeliveryDetailWithRoutesDtoStatusEnum]

export type FFDeliveryDetailWithRoutesDtoType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string
  /**
   * @description Номер поставки (уникальный от ВБ)
   * @type string
   */
  deliveryNumber: string
  /**
   * @description Имя управляющего магазином
   * @type string | undefined
   */
  storeManagerName?: string
  /**
   * @description Дата поставки
   * @type string, date-time
   */
  deliveryDate: string
  /**
   * @type string
   */
  status: FFDeliveryDetailWithRoutesDtoStatusEnumType
  /**
   * @description Информация о кабинете
   * @type object
   */
  cabinet: object
  /**
   * @description Ответственные сотрудники
   * @type array
   */
  responsiblePersons:
    | {
        /**
         * @type string | undefined, uuid
         */
        id?: string
        /**
         * @type string | undefined
         */
        name?: string
      }[]
    | null
  /**
   * @description Тип логистики
   * @type object
   */
  logisticsProvider: object | null
  /**
   * @description Маршруты поставки
   * @type array
   */
  routes: RouteDtoType[]
  /**
   * @description Общее количество товаров
   * @type number | undefined
   */
  totalProductsCount?: number
  /**
   * @description Количество грузовых мест
   * @type number | undefined
   */
  cargoPlaces?: number
  /**
   * @description Общий объем
   * @type number | undefined
   */
  totalVolume?: number
  /**
   * @description Дата и время завершения приемки (перевода в статус \"Принято\")
   * @type string, date-time
   */
  acceptedAt?: string | null
}