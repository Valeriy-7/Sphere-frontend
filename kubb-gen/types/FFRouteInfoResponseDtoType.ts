import type { FFSupplierInfoResponseDtoType } from './FFSupplierInfoResponseDtoType';

export type FFRouteInfoResponseDtoType = {
  /**
   * @description ID маршрута
   * @type string
   */
  id: string;
  /**
   * @description Название маршрута
   * @type string
   */
  name: string;
  /**
   * @description Статус маршрута
   * @type string
   */
  status: string;
  /**
   * @description Дата доставки
   * @type string
   */
  deliveryDate: string;
  /**
   * @description Адрес доставки
   * @type string | undefined
   */
  address?: string;
  /**
   * @description Номер поставки
   * @type string | undefined
   */
  deliveryNumber?: string;
  /**
   * @description Список поставщиков на маршруте
   * @type array
   */
  suppliers: FFSupplierInfoResponseDtoType[];
};
