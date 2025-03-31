import type { FFDeliveryStatsResponseDtoType } from './FFDeliveryStatsResponseDtoType'
import type { FFDeliveryWithRoutesResponseDtoType } from './FFDeliveryWithRoutesResponseDtoType'

export type FFDeliveryWithRoutesListResponseDtoType = {
  /**
   * @description Список поставок с маршрутами
   * @type array
   */
  items: FFDeliveryWithRoutesResponseDtoType[]
  /**
   * @description Статистика по всем поставкам
   */
  stats: FFDeliveryStatsResponseDtoType
  /**
   * @description Общее количество поставок
   * @type number
   */
  total: number
  /**
   * @description Текущая страница
   * @type number
   */
  page: number
  /**
   * @description Всего страниц
   * @type number
   */
  pages: number
  /**
   * @description Количество записей на странице
   * @type number
   */
  limit: number
}