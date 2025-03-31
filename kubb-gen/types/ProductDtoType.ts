import type { ConsumableDtoType } from './ConsumableDtoType'
import type { ServiceDtoType } from './ServiceDtoType'

export type ProductDtoType = {
  /**
   * @description ID товара в WB
   * @type string
   */
  wbProductId: string
  /**
   * @description Количество товара
   * @minLength 1
   * @type number
   */
  quantity: number
  /**
   * @description Плановое количество товара
   * @minLength 1
   * @type number | undefined
   */
  planQuantity?: number
  /**
   * @description Цена товара
   * @minLength 0.01
   * @type number
   */
  price: number
  /**
   * @description Выбранные услуги
   * @type array
   */
  selectedServices: ServiceDtoType[]
  /**
   * @description Выбранные расходники
   * @type array
   */
  selectedConsumables: ConsumableDtoType[]
  /**
   * @description ID поставщика
   * @type string
   */
  supplierId: string
}