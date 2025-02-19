import type { CabinetShortDataDtoType } from './CabinetShortDataDtoType'

export const authUserDataDtoRoleEnum = {
  user: 'user',
  admin: 'admin',
} as const

export type AuthUserDataDtoRoleEnumType = (typeof authUserDataDtoRoleEnum)[keyof typeof authUserDataDtoRoleEnum]

export const authUserDataDtoRegStatusEnum = {
  incomplete: 'incomplete',
  complete: 'complete',
  verified: 'verified',
} as const

export type AuthUserDataDtoRegStatusEnumType = (typeof authUserDataDtoRegStatusEnum)[keyof typeof authUserDataDtoRegStatusEnum]

export type AuthUserDataDtoType = {
  /**
   * @description Уникальный идентификатор пользователя
   * @type string
   */
  id: string
  /**
   * @description Номер телефона пользователя
   * @type string
   */
  phone: string
  /**
   * @description Роль пользователя
   * @type string
   */
  role: AuthUserDataDtoRoleEnumType
  /**
   * @description Статус регистрации пользователя
   * @type string
   */
  regStatus: AuthUserDataDtoRegStatusEnumType
  /**
   * @description Список кабинетов пользователя
   * @type array
   */
  cabinets: CabinetShortDataDtoType[]
}