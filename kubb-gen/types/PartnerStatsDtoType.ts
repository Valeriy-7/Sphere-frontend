export type PartnerStatsDtoType = {
  /**
   * @description Общий доход
   * @type number
   */
  totalIncome: number;
  /**
   * @description Общее количество поставок на ФФ
   * @type number
   */
  totalFfDeliveries: number;
  /**
   * @description Общее количество товара
   * @type number
   */
  totalProductsCount: number;
  /**
   * @description Общее количество брака
   * @type number
   */
  totalDefectsCount: number;
  /**
   * @description Общая сумма расходников
   * @type number
   */
  totalConsumablesAmount: number;
  /**
   * @description Общее количество возвратов с ПВЗ
   * @type number
   */
  totalPvzReturnsCount: number;
  /**
   * @description Общее количество поставок на ВБ
   * @type number
   */
  totalWbDeliveries: number;
  /**
   * @description Общая сумма продукта
   * @type number
   */
  totalProductAmount: number;
};
