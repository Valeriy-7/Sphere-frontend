export type SupplierType = {
  /**
   * @description Уникальный идентификатор поставщика
   * @type string
   */
  id: string;
  /**
   * @description Название компании поставщика
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
   * @description Является ли поставщик ТГ
   * @type boolean
   */
  isTG?: boolean | null;
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string;
  /**
   * @description Дата создания
   * @type string, date-time
   */
  createdAt: string;
  /**
   * @description Дата обновления
   * @type string, date-time
   */
  updatedAt: string;
};
