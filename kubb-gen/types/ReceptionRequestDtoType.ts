export const receptionRequestDtoStatusEnum = {
  new: 'new',
  reception: 'reception',
  accepted: 'accepted',
  preparation: 'preparation',
  to_work: 'to_work',
  completed: 'completed',
} as const

export type ReceptionRequestDtoStatusEnumType = (typeof receptionRequestDtoStatusEnum)[keyof typeof receptionRequestDtoStatusEnum]

export type ReceptionRequestDtoType = {
  /**
   * @description Статус поставки
   * @type string | undefined
   */
  status?: ReceptionRequestDtoStatusEnumType
  /**
   * @description Массив ID ответственных сотрудников
   * @type array
   */
  responsibleIds?: string[] | null
  /**
   * @description ID типа логистики
   * @type string
   */
  logisticsTypeId?: string | null
  /**
   * @description Тип упаковки (текст)
   * @type string
   */
  packagingType?: string | null
  /**
   * @description Время работы (текст)
   * @type string
   */
  workingHours?: string | null
}