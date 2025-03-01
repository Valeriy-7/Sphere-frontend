import type { ConsumableDtoType } from './ConsumableDtoType';
import type { ServiceDtoType } from './ServiceDtoType';

export type ProductDtoType = {
  /**
   * @description ID товара в WB
   * @type string
   */
  wbProductId: string;
  /**
   * @description Количество товара
   * @type number
   */
  quantity: number;
  /**
   * @description Цена товара
   * @type number
   */
  price: number;
  /**
   * @description Выбранные услуги
   * @type array
   */
  selectedServices: ServiceDtoType[];
  /**
   * @description Выбранные расходники
   * @type array
   */
  selectedConsumables: ConsumableDtoType[];
  /**
   * @description ID поставщика
   * @type string
   */
  supplierId: string;
};
