export const partnerCabinetDtoTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const;

export type PartnerCabinetDtoTypeEnumType =
  (typeof partnerCabinetDtoTypeEnum)[keyof typeof partnerCabinetDtoTypeEnum];

export type PartnerCabinetDtoType = {
  /**
   * @description ID кабинета
   * @type string
   */
  id: string;
  /**
   * @description Номер первого уровня
   * @type string
   */
  number1: string;
  /**
   * @description Тип организации
   * @type string
   */
  type: PartnerCabinetDtoTypeEnumType;
  /**
   * @description Название компании
   * @type string
   */
  companyName: string;
  /**
   * @description Юридическое название компании
   * @type string
   */
  legalCompanyName: string;
  /**
   * @description URL аватарки
   * @type string
   */
  avatarUrl: string;
  /**
   * @description Статус верификации
   * @type boolean
   */
  isVerified: boolean;
  /**
   * @description Контактный телефон
   * @type string
   */
  companyPhone: string;
  /**
   * @description Telegram
   * @type string
   */
  telegramUrl: string;
  /**
   * @description Дата создания
   * @type string, date-time
   */
  createdAt: string;
  /**
   * @description Общий доход
   * @type number
   */
  income: number;
  /**
   * @description Количество поставок на ФФ
   * @type number
   */
  ffDeliveries: number;
  /**
   * @description Количество товара
   * @type number
   */
  productsCount: number;
  /**
   * @description Количество брака
   * @type number
   */
  defectsCount: number;
  /**
   * @description Сумма расходников
   * @type number
   */
  consumablesAmount: number;
  /**
   * @description Количество возвратов с ПВЗ
   * @type number
   */
  pvzReturnsCount: number;
  /**
   * @description Количество поставок на ВБ
   * @type number
   */
  wbDeliveries: number;
  /**
   * @description Сумма продукта
   * @type number
   */
  productAmount: number;
};
