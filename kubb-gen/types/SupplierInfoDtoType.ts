export type SupplierInfoDtoType = {
  /**
   * @description ID поставщика
   * @type string, uuid
   */
  id: string;
  /**
   * @description Название поставщика
   * @type string
   */
  name: string;
  /**
   * @description Адрес поставщика
   * @type string | undefined
   */
  address?: string;
  /**
   * @description Контактное лицо
   * @type string | undefined
   */
  contactPerson?: string;
  /**
   * @description Контактный телефон
   * @type string | undefined
   */
  contactPhone?: string;
  /**
   * @description Местоположение
   * @type string | undefined
   */
  location?: string;
  /**
   * @description Является ли поставщиком ТЯК
   * @type boolean | undefined
   */
  isTG?: boolean;
};
