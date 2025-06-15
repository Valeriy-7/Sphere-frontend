export const cabinetTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const

export type CabinetTypeEnumType = (typeof cabinetTypeEnum)[keyof typeof cabinetTypeEnum]

export type CabinetType = {
  /**
   * @description ID кабинета
   * @type string
   */
  id: string | null
  /**
   * @description ID пользователя
   * @type string
   */
  userId: string | null
  /**
   * @description Тип организации
   * @type string
   */
  type: CabinetTypeEnumType | null
  /**
   * @description ИНН
   * @type string
   */
  inn: string | null
  /**
   * @description Юридическое название организации
   * @type string
   */
  legalCompanyName: string | null
  /**
   * @description Название компании (для отображения)
   * @type string
   */
  companyName?: string | null
  /**
   * @description Номер первого уровня
   * @type string
   */
  number1: string | null
  /**
   * @description Номер второго уровня
   * @type string
   */
  number2: string | null
  /**
   * @description Дата создания
   * @type string, date-time
   */
  createdAt: string | null
  /**
   * @description Дата обновления
   * @type string, date-time
   */
  updatedAt: string | null
  /**
   * @description Дата верификации
   * @type string, date-time
   */
  verifiedAt: string | null
  /**
   * @description Дата последнего посещения
   * @type string, date-time
   */
  lastSeenAt: string | null
  /**
   * @description URL аватарки кабинета
   * @type string
   */
  avatarUrl: string | null
  /**
   * @description API ключ Wildberries
   * @type string
   */
  apiKey?: string | null
  /**
   * @description Статус верификации кабинета
   * @type boolean
   */
  isVerified: boolean | null
  /**
   * @description Статус активности кабинета
   * @type boolean
   */
  isActive: boolean | null
  /**
   * @description ОГРН организации
   * @type string
   */
  ogrn: string | null
  /**
   * @description ФИО управляющего
   * @type string
   */
  managerFullName: string | null
  /**
   * @description ФИО владельца
   * @type string
   */
  ownerFullName: string | null
  /**
   * @description Юридический адрес
   * @type string
   */
  legalAddress: string | null
  /**
   * @description Фактический адрес
   * @type string
   */
  actualAddress: string | null
  /**
   * @description Телефон организации
   * @type string
   */
  companyPhone: string | null
  /**
   * @description Email организации
   * @type string
   */
  companyEmail: string | null
  /**
   * @description Ссылка на Telegram
   * @type string
   */
  telegramUrl: string | null
  /**
   * @description Ссылка на WhatsApp
   * @type string
   */
  whatsappUrl: string | null
  /**
   * @description Название банка
   * @type string
   */
  bankName: string | null
  /**
   * @description БИК банка
   * @type string
   */
  bik: string | null
  /**
   * @description Расчетный счет
   * @type string
   */
  checkingAccount: string | null
  /**
   * @description Корреспондентский счет
   * @type string
   */
  correspondentAccount: string | null
  /**
   * @description Ссылка для регистрации партнеров
   * @type string
   */
  registrationUrl: string | null
  /**
   * @description Связанные кабинеты (где этот кабинет является партнером)
   * @type array
   */
  partners: CabinetType[]
  /**
   * @description Комментарий администратора при верификации
   * @type string
   */
  verificationComment?: string | null
  /**
   * @description Дата блокировки
   * @type string, date-time
   */
  blockedAt: string | null
}