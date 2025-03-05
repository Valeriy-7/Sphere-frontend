import type { ProductCityDtoType } from './ProductCityDtoType';

export type ProductListItemDtoType = {
  /**
   * @description ID продукта
   * @type string
   */
  id: string;
  /**
   * @description Артикул товара
   * @type string
   */
  article: string;
  /**
   * @description Название товара
   * @type string
   */
  name: string;
  /**
   * @description Цвет товара
   * @type string
   */
  color: string;
  /**
   * @description Категория товара
   * @type string
   */
  category: string;
  /**
   * @description Общее количество товара
   * @type number
   */
  total: number;
  /**
   * @description Количество товара на складе
   * @type number
   */
  inStock: number;
  /**
   * @description Количество товара в пути к клиенту
   * @type number
   */
  inTransitToClient: number;
  /**
   * @description Количество товара в пути от клиента
   * @type number
   */
  inTransitFromClient: number;
  /**
   * @description Размеры товара
   * @type array
   */
  sizes: string[];
  /**
   * @description Числовые размеры товара
   * @type array
   */
  numericSizes: string[];
  /**
   * @description Объем товара
   * @type number
   */
  volume: number;
  /**
   * @description Единица измерения объема
   * @type string
   */
  volumeUnit: string;
  /**
   * @description Ширина товара в см
   * @type number
   */
  width: number;
  /**
   * @description Высота товара в см
   * @type number
   */
  height: number;
  /**
   * @description Длина товара в см
   * @type number
   */
  length: number;
  /**
   * @description Всего поставлено товара
   * @type number
   */
  totalSupplied: number;
  /**
   * @description Всего продано товара
   * @type number
   */
  totalSold: number;
  /**
   * @description Процент продаж
   * @type number
   */
  salesPercentage: number;
  /**
   * @description Всего заказов
   * @type number
   */
  totalOrders: number;
  /**
   * @description Всего отмен
   * @type number
   */
  totalCancellations: number;
  /**
   * @description Всего возвратов
   * @type number
   */
  totalReturns: number;
  /**
   * @description Распределение по городам
   * @type array
   */
  cities: ProductCityDtoType[];
  /**
   * @description URL изображения товара
   * @type string
   */
  imageUrl: string;
};
