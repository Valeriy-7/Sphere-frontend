import type { DeliveryStatusType } from '../DeliveryStatusType'
import type { FFDeliveryWithRoutesListResponseDtoType } from '../FFDeliveryWithRoutesListResponseDtoType'

export type FFDeliveriesGetFFDeliveriesQueryParamsType = {
  /**
   * @description Номер страницы
   * @minLength 1
   * @default 1
   * @type number | undefined
   */
  page?: number
  /**
   * @description Количество записей на странице. Для получения всех записей установите значение -1.
   * @minLength -1
   * @maxLength 100
   * @default 10
   * @type number | undefined
   */
  limit?: number
  /**
   * @type string | undefined
   */
  status?: DeliveryStatusType
  /**
   * @description Дата начала периода в формате ISO (YYYY-MM-DD)
   * @type string | undefined, date-time
   */
  startDate?: string
  /**
   * @description Дата окончания периода в формате ISO (YYYY-MM-DD)
   * @type string | undefined, date-time
   */
  endDate?: string
  /**
   * @description Конкретная дата поставки в формате ISO (YYYY-MM-DD). Если указана, то startDate и endDate игнорируются.
   * @type string | undefined, date-time
   */
  deliveryDate?: string
  /**
   * @description Номер поставки (последние 5 символов ID)
   * @type string | undefined
   */
  deliveryNumber?: string
}

/**
 * @description Список поставок с маршрутами, поставщиками и статистикой
 */
export type FFDeliveriesGetFFDeliveries200Type = FFDeliveryWithRoutesListResponseDtoType

/**
 * @description Не авторизован
 */
export type FFDeliveriesGetFFDeliveries401Type = any

export type FFDeliveriesGetFFDeliveriesQueryResponseType = FFDeliveriesGetFFDeliveries200Type

export type FFDeliveriesGetFFDeliveriesTypeQuery = {
  Response: FFDeliveriesGetFFDeliveries200Type
  QueryParams: FFDeliveriesGetFFDeliveriesQueryParamsType
  Errors: FFDeliveriesGetFFDeliveries401Type
}