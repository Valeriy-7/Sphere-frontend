export type FFSupplierInfoResponseDtoType = {
  /**
   * @description ID поставщика
   * @type string
   */
  id: string;
  /**
   * @description Название поставщика
   * @type string
   */
  name: string;
  /**
   * @description Адрес поставщика
   * @type string | undefined
   */
  address?: string;
  /**
   * @description Контактное лицо
   * @type string | undefined
   */
  contactPerson?: string;
  /**
   * @description Контактный телефон
   * @type string | undefined
   */
  contactPhone?: string;
  /**
   * @description Местоположение
   * @type string | undefined
   */
  location?: string;
  /**
   * @description Является ли поставщик ТГ
   * @type boolean | undefined
   */
  isTG?: boolean;
  /**
   * @description Порядковый номер поставщика
   * @type number | undefined
   */
  number?: number;
  /**
   * @description Плановое количество товаров поставщика
   * @type number | undefined
   */
  planQuantity?: number;
  /**
   * @description Фактическое количество товаров поставщика
   * @type number | undefined
   */
  factQuantity?: number;
  /**
   * @description Количество дефектов у поставщика
   * @type number | undefined
   */
  defects?: number;
  /**
   * @description Стоимость товаров поставщика
   * @type number | undefined
   */
  productsPrice?: number;
  /**
   * @description Стоимость услуг фулфилмента для поставщика
   * @type number | undefined
   */
  ffServicesPrice?: number;
  /**
   * @description Стоимость логистики до фулфилмента для поставщика
   * @type number | undefined
   */
  logisticsToFFPrice?: number;
  /**
   * @description Общая сумма для поставщика (товары + услуги + логистика)
   * @type number | undefined
   */
  totalPrice?: number;
};
