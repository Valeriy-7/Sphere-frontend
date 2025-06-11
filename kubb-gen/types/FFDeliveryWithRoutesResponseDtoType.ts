import type { FFRouteInfoResponseDtoType } from './FFRouteInfoResponseDtoType'
import type { ResponsiblePersonListItemDtoType } from './ResponsiblePersonListItemDtoType'

export type FFDeliveryWithRoutesResponseDtoType = {
  /**
   * @description ID поставки
   * @type string
   */
  id: string
  /**
   * @description Номер поставки
   * @type number
   */
  number: number
  /**
   * @description Статус поставки
   * @type string
   */
  status: string
  /**
   * @description Дата поставки
   * @type string, date-time
   */
  deliveryDate: string
  /**
   * @description Количество грузовых мест
   * @type number
   */
  cargoPlaces: number
  /**
   * @description Объем груза (м³)
   * @type number
   */
  cargoVolume: number
  /**
   * @description Плановое количество товаров
   * @type number
   */
  planQuantity: number
  /**
   * @description Фактическое количество товаров
   * @type number
   */
  factQuantity: number | null
  /**
   * @description Количество дефектов
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
  /**
   * @description Номер поставки для отображения (последние 5 символов ID)
   * @type string
   */
  deliveryNumber: string
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
   * @description Дата принятия поставки
   * @type string | undefined, date-time
   */
  acceptedAt?: string | null
  /**
   * @description Список ответственных сотрудников
   * @type array | undefined
   */
  responsiblePersons?: ResponsiblePersonListItemDtoType[]
  /**
   * @description Маршруты поставки
   * @type array
   */
  routes: FFRouteInfoResponseDtoType[]
}