import type { SelectedConsumableDtoType } from './SelectedConsumableDtoType';
import type { SelectedServiceDtoType } from './SelectedServiceDtoType';

export type DeliveryProductDtoType = {
  /**
   * @description ID товара в Wildberries
   * @type string
   */
  wbProductId: string;
  /**
   * @description Количество единиц товара
   * @type number
   */
  quantity: number;
  /**
   * @description Цена за единицу товара
   * @type number
   */
  price: number;
  /**
   * @description Выбранные услуги для товара
   * @type array
   */
  selectedServices: SelectedServiceDtoType[];
  /**
   * @description Выбранные расходники для товара
   * @type array
   */
  selectedConsumables: SelectedConsumableDtoType[];
  /**
   * @description ID поставщика товара
   * @type string | undefined
   */
  supplierId?: string;
};
