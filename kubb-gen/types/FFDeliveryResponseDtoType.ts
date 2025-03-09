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
};
