export type CreateSupplierDtoType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string;
  /**
   * @description Название поставщика
   * @type string
   */
  name: string;
  /**
   * @description Имя контактного лица
   * @type string
   */
  contactName: string;
  /**
   * @description Номер телефона
   * @type string
   */
  phone: string;
  /**
   * @description Название рынка
   * @type string
   */
  marketplaceName: string;
  /**
   * @description Адрес
   * @type string
   */
  address: string;
  /**
   * @description Место (павильон, линия и т.д.)
   * @type string
   */
  location: string;
  /**
   * @description Telegram аккаунт
   * @type string | undefined
   */
  telegram?: string;
};
