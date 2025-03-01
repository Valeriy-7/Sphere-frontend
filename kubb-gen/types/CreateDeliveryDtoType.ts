import type { ProductDtoType } from './ProductDtoType';

export type CreateDeliveryDtoType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string;
  /**
   * @description Дата поставки
   * @type string
   */
  deliveryDate: string;
  /**
   * @description Количество грузовых мест
   * @type number | undefined
   */
  cargoPlaces?: number;
  /**
   * @description Товары в поставке
   * @type array
   */
  products: ProductDtoType[];
};
