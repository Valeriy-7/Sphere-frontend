export type ProductStatsDtoType = {
  /**
   * @description Общее количество товаров
   * @type number
   */
  totalProducts: number;
  /**
   * @description Общее количество товаров на складе
   * @type number
   */
  totalInStock: number;
  /**
   * @description Общее количество товаров в пути к клиенту
   * @type number
   */
  totalInTransitToClient: number;
  /**
   * @description Общее количество товаров в пути от клиента
   * @type number
   */
  totalInTransitFromClient: number;
  /**
   * @description Общее количество поставленных товаров
   * @type number
   */
  totalSupplied: number;
  /**
   * @description Общее количество проданных товаров
   * @type number
   */
  totalSold: number;
  /**
   * @description Общий процент продаж
   * @type number
   */
  totalSalesPercentage: number;
  /**
   * @description Общее количество заказов
   * @type number
   */
  totalOrders: number;
  /**
   * @description Общее количество отмен
   * @type number
   */
  totalCancellations: number;
  /**
   * @description Общее количество возвратов
   * @type number
   */
  totalReturns: number;
};
