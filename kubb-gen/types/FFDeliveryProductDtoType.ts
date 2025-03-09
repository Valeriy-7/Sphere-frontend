export type FFDeliveryProductDtoType = {
  /**
   * @description ID продукта
   * @type string, uuid
   */
  id: string;
  /**
   * @description Порядковый номер
   * @type number
   */
  number: number;
  /**
   * @description Название продукта
   * @type string
   */
  name: string;
  /**
   * @description URL изображения продукта
   * @type string
   */
  imageUrl: string;
  /**
   * @description Плановое количество
   * @type number
   */
  planQuantity: number;
  /**
   * @description Фактическое количество
   * @type number
   */
  factQuantity: number;
  /**
   * @description Количество дефектов
   * @type number
   */
  defects: number;
  /**
   * @description Цена за единицу
   * @type number
   */
  price: number;
  /**
   * @description Стоимость логистики за единицу
   * @type number
   */
  logisticsPrice: number;
  /**
   * @description Стоимость расходников за единицу
   * @type number
   */
  consumablesPrice: number;
  /**
   * @description ID поставщика
   * @type string, uuid
   */
  supplierId: string;
  /**
   * @description Название поставщика
   * @type string
   */
  supplierName: string;
};
