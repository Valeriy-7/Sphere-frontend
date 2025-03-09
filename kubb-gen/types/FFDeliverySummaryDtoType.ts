export type FFDeliverySummaryDtoType = {
  /**
   * @description Количество поставщиков
   * @type number
   */
  suppliersCount: number;
  /**
   * @description Общее количество грузовых мест
   * @type number
   */
  totalCargoPlaces: number;
  /**
   * @description Общее плановое количество товаров
   * @type number
   */
  totalPlanQuantity: number;
  /**
   * @description Общее фактическое количество товаров
   * @type number
   */
  totalFactQuantity: number;
  /**
   * @description Общее количество дефектов
   * @type number
   */
  totalDefects: number;
  /**
   * @description Общая стоимость товаров
   * @type number
   */
  totalProductsPrice: number;
  /**
   * @description Общая стоимость услуг ФФ
   * @type number
   */
  totalFFServicesPrice: number;
  /**
   * @description Общая стоимость логистики до ФФ
   * @type number
   */
  totalLogisticsToFFPrice: number;
};
