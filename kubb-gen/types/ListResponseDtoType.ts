import type { ListItemDtoType } from './ListItemDtoType';

export type ListResponseDtoType = {
  /**
   * @description Элементы списка
   * @type array
   */
  items: ListItemDtoType[];
  /**
   * @description Общее количество записей
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
};
