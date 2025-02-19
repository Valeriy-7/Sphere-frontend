export type CabinetShortDataDtoType = {
  /**
   * @description Уникальный идентификатор кабинета
   * @type string
   */
  id: string
  /**
   * @description Тип кабинета (wildberries или fulfillment)
   * @type string
   */
  type: string
  /**
   * @description Статус верификации кабинета
   * @type boolean
   */
  isVerified: boolean
  /**
   * @description Название организации
   * @type string
   */
  companyName: string
  /**
   * @description URL аватарки кабинета
   * @type string
   */
  avatarUrl: string | null
  /**
   * @description Признак активного кабинета
   * @type boolean
   */
  isActive: boolean
}