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
   * @description Артикул товара
   * @type string
   */
  article: string;
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
   * @description Фактическое количество (может быть null или \"-\" после создания поставки)
   * @type number
   */
  factQuantity: number | null;
  /**
   * @description Количество дефектов (может быть null или \"-\" после создания поставки)
   * @type number
   */
  defects: number | null;
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
