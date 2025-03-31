import type { DeliveryStatusType } from '../DeliveryStatusType'
import type { FFDeliveryWithRoutesListResponseDtoType } from '../FFDeliveryWithRoutesListResponseDtoType'

export type FFAccountDeliveriesGetDeliveriesQueryParamsType = {
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
   * @description Начальная дата периода в формате YYYY-MM-DD
   * @type string | undefined, date-time
   */
  startDate?: string
  /**
   * @description Дата окончания периода в формате ISO (YYYY-MM-DD)
   * @type string | undefined
   */
  endDate?: string
  /**
   * @description Конкретная дата поставки в формате ISO (YYYY-MM-DD). Если указана, то startDate и endDate игнорируются.
   * @type string | undefined
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
export type FFAccountDeliveriesGetDeliveries200Type = FFDeliveryWithRoutesListResponseDtoType

export type FFAccountDeliveriesGetDeliveriesQueryResponseType = FFAccountDeliveriesGetDeliveries200Type

export type FFAccountDeliveriesGetDeliveriesTypeQuery = {
  Response: FFAccountDeliveriesGetDeliveries200Type
  QueryParams: FFAccountDeliveriesGetDeliveriesQueryParamsType
  Errors: any
}