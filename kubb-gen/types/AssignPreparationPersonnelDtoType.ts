export type AssignPreparationPersonnelDtoType = {
  /**
   * @description ID ответственного сотрудника за подготовку
   * @type string, uuid
   */
  responsibleId: string
  /**
   * @description Массив ID сотрудников-исполнителей подготовки
   * @type array
   */
  performerIds: string[]
}