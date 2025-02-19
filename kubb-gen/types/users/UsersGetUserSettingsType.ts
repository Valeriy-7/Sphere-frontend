import type { UserType } from '../UserType'

/**
 * @description Настройки успешно получены
 */
export type UsersGetUserSettings200Type = UserType

export type UsersGetUserSettingsQueryResponseType = UsersGetUserSettings200Type

export type UsersGetUserSettingsTypeQuery = {
  Response: UsersGetUserSettings200Type
  Errors: any
}