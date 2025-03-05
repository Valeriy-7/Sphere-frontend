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
   * @description ФИО контактного лица
   * @type string
   */
  contactName: string;
  /**
   * @description Номер телефона
   * @type string
   */
  phone: string;
  /**
   * @description Название маркетплейса
   * @type string
   */
  marketplaceName: string;
  /**
   * @description Адрес
   * @type string
   */
  address: string;
  /**
   * @description Местоположение (павильон, линия и т.д.)
   * @type string
   */
  location: string;
  /**
   * @description Telegram аккаунт
   * @type string
   */
  telegram?: string | null;
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
