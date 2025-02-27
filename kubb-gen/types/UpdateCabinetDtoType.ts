export const updateCabinetDtoTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const;

export type UpdateCabinetDtoTypeEnumType =
  (typeof updateCabinetDtoTypeEnum)[keyof typeof updateCabinetDtoTypeEnum];

export type UpdateCabinetDtoType = {
  /**
   * @description API ключ (только для Wildberries)
   * @type string
   */
  apiKey?: string | null;
  /**
   * @description ИНН организации
   * @type string
   */
  inn?: string | null;
  /**
   * @description ОГРН организации
   * @type string
   */
  ogrn?: string | null;
  /**
   * @description Юридическое название организации
   * @type string
   */
  legalCompanyName?: string | null;
  /**
   * @description Юридический адрес
   * @type string
   */
  legalAddress?: string | null;
  /**
   * @description Название организации для отображения
   * @type string
   */
  companyName?: string | null;
  /**
   * @description Телефон организации
   * @type string
   */
  companyPhone?: string | null;
  /**
   * @description Email организации
   * @type string
   */
  companyEmail?: string | null;
  /**
   * @description Ссылка на Telegram
   * @type string
   */
  telegramUrl?: string | null;
  /**
   * @description Ссылка на WhatsApp
   * @type string
   */
  whatsappUrl?: string | null;
  /**
   * @description Фактический адрес
   * @type string
   */
  actualAddress?: string | null;
  /**
   * @description ФИО управляющего
   * @type string
   */
  managerFullName?: string | null;
  /**
   * @description Название банка
   * @type string
   */
  bankName?: string | null;
  /**
   * @description БИК банка
   * @type string
   */
  bik?: string | null;
  /**
   * @description Расчетный счет
   * @type string
   */
  checkingAccount?: string | null;
  /**
   * @description Корреспондентский счет
   * @type string
   */
  correspondentAccount?: string | null;
  /**
   * @description Ссылка для регистрации контрагентов
   * @type string
   */
  registrationUrl?: string | null;
  /**
   * @description URL аватарки
   * @type string
   */
  avatarUrl?: string | null;
  /**
   * @description Тип организации
   * @type string
   */
  type?: UpdateCabinetDtoTypeEnumType | null;
};
