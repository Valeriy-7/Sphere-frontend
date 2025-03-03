export type DeliveryType = {
  /**
   * @description Уникальный идентификатор поставки
   * @type string
   */
  id: string;
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string;
  /**
   * @description Дата поставки
   * @type string, date-time
   */
  deliveryDate: string;
  /**
   * @description Количество грузовых мест
   * @type number | undefined
   */
  cargoPlaces?: number;
  /**
   * @description Общая стоимость товаров
   * @type number
   */
  totalProductsPrice: number;
  /**
   * @description Стоимость логистики до фулфилмента
   * @type number
   */
  logisticsToFFPrice: number;
  /**
   * @description Стоимость услуг фулфилмента
   * @type number
   */
  ffServicesPrice: number;
  /**
   * @description Итоговая сумма
   * @type number
   */
  totalAmount: number;
  /**
   * @description Дата создания записи
   * @type string, date-time
   */
  createdAt: string;
  /**
   * @description Дата последнего обновления записи
   * @type string, date-time
   */
  updatedAt: string;
};
