export type WorkerListItemDtoType = {
  /**
   * @description Уникальный идентификатор сотрудника
   * @type string
   */
  id: string
  /**
   * @description Имя сотрудника
   * @type string
   */
  name: string
  /**
   * @description Должность сотрудника (необязательно)
   * @type string | undefined
   */
  position?: string
}