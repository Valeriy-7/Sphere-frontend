import type { ProductListItemDtoType } from './ProductListItemDtoType';
import type { ProductStatsDtoType } from './ProductStatsDtoType';

export type ProductListResponseDtoType = {
  /**
   * @description Общая статистика
   */
  stats: ProductStatsDtoType;
  /**
   * @description Список товаров
   * @type array
   */
  items: ProductListItemDtoType[];
};
