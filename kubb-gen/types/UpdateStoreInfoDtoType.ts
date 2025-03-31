export type UpdateStoreInfoDtoType = {
  /**
   * @description ID магазина
   * @type string | undefined, uuid
   */
  storeId?: string
  /**
   * @description Название магазина
   * @type string | undefined
   */
  storeName?: string
  /**
   * @description Контактное лицо магазина
   * @type string | undefined
   */
  storeContactPerson?: string
  /**
   * @description Контактный телефон магазина
   * @type string | undefined
   */
  storeContactPhone?: string
  /**
   * @description Время работы магазина
   * @type string | undefined
   */
  storeWorkingHours?: string
  /**
   * @description Идентификатор магазина в системе
   * @type string | undefined
   */
  storeExternalId?: string
}