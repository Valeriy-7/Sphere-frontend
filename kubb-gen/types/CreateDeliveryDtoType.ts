import type { DeliveryProductDtoType } from './DeliveryProductDtoType';

export type CreateDeliveryDtoType = {
  /**
   * @description Дата поставки
   * @type string, date-time
   */
  deliveryDate: string;
  /**
   * @description Количество грузовых мест
   * @type number
   */
  cargoPlaces: number;
  /**
   * @description Список товаров в поставке
   * @type array
   */
  products: DeliveryProductDtoType[];
};
