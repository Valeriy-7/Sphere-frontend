import type { FFSupplierInfoResponseDtoType } from './FFSupplierInfoResponseDtoType'

export type FFRouteInfoResponseDtoType = {
  /**
   * @description ID маршрута
   * @type string
   */
  id: string
  /**
   * @description Порядковый номер маршрута
   * @type number
   */
  number: number
  /**
   * @description Название маршрута
   * @type string
   */
  name: string
  /**
   * @description Статус маршрута
   * @type string
   */
  status: string
  /**
   * @description Дата доставки
   * @type string, date-time
   */
  deliveryDate: string
  /**
   * @description Адрес доставки
   * @type string | undefined
   */
  address?: string
  /**
   * @description Номер поставки
   * @type string | undefined
   */
  deliveryNumber?: string
  /**
   * @description Список поставщиков на маршруте
   * @type array
   */
  suppliers: FFSupplierInfoResponseDtoType[]
  /**
   * @description Плановое количество товаров
   * @type number
   */
  planQuantity: number
  /**
   * @description Фактическое количество товаров (может быть null или \"-\" после создания поставки)
   * @type number
   */
  factQuantity: number | null
  /**
   * @description Количество дефектов (может быть null или \"-\" после создания поставки)
   * @type number
   */
  defects: number | null
  /**
   * @description Стоимость товаров
   * @type number
   */
  productsPrice: number
  /**
   * @description Стоимость услуг фулфилмента
   * @type number
   */
  ffServicesPrice: number
  /**
   * @description Стоимость логистики до фулфилмента
   * @type number
   */
  logisticsToFFPrice: number
  /**
   * @description Общая сумма (товары + услуги + логистика)
   * @type number
   */
  totalPrice: number
}