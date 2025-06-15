export type SendGroupToReceptionDtoType = {
  /**
   * @description Список идентификаторов поставок
   * @type array
   */
  deliveryIds: string[]
  /**
   * @description Список идентификаторов ответственных сотрудников (опционально)
   * @type array | undefined
   */
  responsiblePersonIds?: string[]
  /**
   * @description Идентификатор типа логистики (опционально)
   * @type string | undefined
   */
  logisticsTypeId?: string
}