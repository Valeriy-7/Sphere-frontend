import type { FFDeliveryListItemDtoType } from './FFDeliveryListItemDtoType';
import type { FFDeliverySummaryDtoType } from './FFDeliverySummaryDtoType';

export type FFDeliveryResponseDtoType = {
  /**
   * @description Сводная информация о поставках
   */
  summary: FFDeliverySummaryDtoType;
  /**
   * @description Список поставок
   * @type array
   */
  deliveries: FFDeliveryListItemDtoType[];
  /**
   * @description Общее количество поставок
   * @type number
   */
  total: number;
  /**
   * @description Текущая страница
   * @type number
   */
  page: number;
  /**
   * @description Всего страниц
   * @type number
   */
  pages: number;
  /**
   * @description Количество записей на странице
   * @type number
   */
  limit: number;
};
