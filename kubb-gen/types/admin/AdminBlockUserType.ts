import type { BlockUserDtoType } from '../BlockUserDtoType'
import type { UserType } from '../UserType'

export type AdminBlockUserPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Статус блокировки успешно обновлен
 */
export type AdminBlockUser200Type = UserType

export type AdminBlockUserMutationRequestType = BlockUserDtoType

export type AdminBlockUserMutationResponseType = AdminBlockUser200Type

export type AdminBlockUserTypeMutation = {
  Response: AdminBlockUser200Type
  Request: AdminBlockUserMutationRequestType
  PathParams: AdminBlockUserPathParamsType
  Errors: any
}