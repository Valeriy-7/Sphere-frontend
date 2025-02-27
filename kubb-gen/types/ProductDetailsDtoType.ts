import type { CityStockDtoType } from './CityStockDtoType';

export type ProductDetailsDtoType = {
  /**
   * @description ID продукта
   * @type string
   */
  id: string;
  /**
   * @description Артикул WB
   * @type string
   */
  article: string;
  /**
   * @description Цвет
   * @type string
   */
  color: string;
  /**
   * @description Категория
   * @type string
   */
  category: string;
  /**
   * @description Общее количество
   * @type number
   */
  total: number;
  /**
   * @description Количество на складах
   * @type number
   */
  inStock: number;
  /**
   * @description В пути к клиенту
   * @type number
   */
  inTransitToClient: number;
  /**
   * @description В пути от клиента
   * @type number
   */
  inTransitFromClient: number;
  /**
   * @description Размеры
   * @type array
   */
  sizes: string[];
  /**
   * @description Распределение по городам
   * @type array
   */
  cities: CityStockDtoType[];
};
