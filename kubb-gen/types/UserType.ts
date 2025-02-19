export const userRoleEnum = {
  user: 'user',
  admin: 'admin',
} as const

export type UserRoleEnumType = (typeof userRoleEnum)[keyof typeof userRoleEnum]

export type UserType = {
  /**
   * @description ID пользователя
   * @type string
   */
  id: string
  /**
   * @description ФИО пользователя
   * @type string
   */
  fullName: string
  /**
   * @description Номер телефона
   * @type string
   */
  phone: string
  /**
   * @description Дата создания
   * @type string, date-time
   */
  createdAt: string
  /**
   * @description Дата обновления
   * @type string, date-time
   */
  updatedAt: string
  /**
   * @description Дата блокировки
   * @type string, date-time
   */
  blockedAt: string
  /**
   * @description Роль пользователя
   * @type string
   */
  role: UserRoleEnumType
  /**
   * @description Статус блокировки пользователя
   * @type boolean
   */
  isBlocked: boolean
  /**
   * @description Причина блокировки
   * @type string | undefined
   */
  blockReason?: string
}