import type { DeliveryPointDtoType } from './DeliveryPointDtoType'

export type LogisticsPriceDtoType = {
  /**
   * @description Точка отправления
   */
  fromPoint: DeliveryPointDtoType
  /**
   * @description Точка назначения
   */
  toPoint: DeliveryPointDtoType
  /**
   * @description Цена за объем до 1 м³
   * @type number
   */
  priceUpTo1m3: number
  /**
   * @description Цена за 1 м³
   * @type number
   */
  pricePer1m3: number
  /**
   * @description Описание маршрута
   * @type string | undefined
   */
  description?: string
}