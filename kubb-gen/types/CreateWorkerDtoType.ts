export type CreateWorkerDtoType = {
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