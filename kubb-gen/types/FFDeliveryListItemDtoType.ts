import type { DeliveryStatusType } from './DeliveryStatusType';
import type { SupplierInfoDtoType } from './SupplierInfoDtoType';

export type FFDeliveryListItemDtoType = {
  /**
   * @description ID поставки
   * @type string, uuid
   */
  id: string;
  /**
   * @description Порядковый номер
   * @type number
   */
  number: number;
  /**
   * @description Дата поставки
   * @type string
   */
  deliveryDate: string;
  /**
   * @description Название поставщика
   * @type string
   */
  supplierName: string;
  /**
   * @description Название магазина/маркетплейса
   * @type string
   */
  marketplaceName: string;
  /**
   * @description Количество грузовых мест
   * @type number
   */
  cargoPlaces: number;
  /**
   * @description Плановое количество товаров
   * @type number
   */
  planQuantity: number;
  /**
   * @description Фактическое количество товаров
   * @type number
   */
  factQuantity: number;
  /**
   * @description Количество дефектов
   * @type number
   */
  defects: number;
  /**
   * @description Стоимость товаров
   * @type number
   */
  productsPrice: number;
  /**
   * @description Стоимость услуг ФФ
   * @type number
   */
  ffServicesPrice: number;
  /**
   * @description Стоимость логистики до ФФ
   * @type number
   */
  logisticsToFFPrice: number;
  /**
   * @description Статус поставки
   */
  status: DeliveryStatusType;
  /**
   * @description Информация о поставщике
   */
  supplierInfo: SupplierInfoDtoType;
};
