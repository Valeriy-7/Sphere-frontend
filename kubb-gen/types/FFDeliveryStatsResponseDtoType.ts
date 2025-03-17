export type FFDeliveryStatsResponseDtoType = {
  /**
   * @description Общее плановое количество товаров
   * @type number
   */
  planQuantity: number;
  /**
   * @description Общее фактическое количество товаров
   * @type number
   */
  factQuantity: number;
  /**
   * @description Общее количество дефектов
   * @type number
   */
  defects: number;
  /**
   * @description Общая стоимость товаров
   * @type number
   */
  productsPrice: number;
  /**
   * @description Общая стоимость услуг фулфилмента
   * @type number
   */
  ffServicesPrice: number;
  /**
   * @description Общая стоимость логистики до фулфилмента
   * @type number
   */
  logisticsToFFPrice: number;
};
