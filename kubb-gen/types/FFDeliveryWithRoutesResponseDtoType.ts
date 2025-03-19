import type { FFRouteInfoResponseDtoType } from './FFRouteInfoResponseDtoType';

export type FFDeliveryWithRoutesResponseDtoType = {
  /**
   * @description ID поставки
   * @type string
   */
  id: string;
  /**
   * @description Номер поставки
   * @type number
   */
  number: number;
  /**
   * @description Статус поставки
   * @type string
   */
  status: string;
  /**
   * @description Дата поставки
   * @type string
   */
  deliveryDate: string;
  /**
   * @description Количество грузовых мест
   * @type number
   */
  cargoPlaces: number;
  /**
   * @description Плановое количество товаров
   * @type number
   */
  planQuantity: number;
  /**
   * @description Фактическое количество товаров
   * @type number
   */
  factQuantity: number;
  /**
   * @description Количество дефектов
   * @type number
   */
  defects: number;
  /**
   * @description Стоимость товаров
   * @type number
   */
  productsPrice: number;
  /**
   * @description Стоимость услуг фулфилмента
   * @type number
   */
  ffServicesPrice: number;
  /**
   * @description Стоимость логистики до фулфилмента
   * @type number
   */
  logisticsToFFPrice: number;
  /**
   * @description Общая сумма (товары + услуги + логистика)
   * @type number
   */
  totalPrice: number;
  /**
   * @description Маршруты поставки
   * @type array
   */
  routes: FFRouteInfoResponseDtoType[];
};
