import type { CabinetType } from '../CabinetType'
import type { VerifyCabinetDtoType } from '../VerifyCabinetDtoType'

export type AdminVerifyCabinetPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Статус верификации успешно обновлен
 */
export type AdminVerifyCabinet200Type = CabinetType

export type AdminVerifyCabinetMutationRequestType = VerifyCabinetDtoType

export type AdminVerifyCabinetMutationResponseType = AdminVerifyCabinet200Type

export type AdminVerifyCabinetTypeMutation = {
  Response: AdminVerifyCabinet200Type
  Request: AdminVerifyCabinetMutationRequestType
  PathParams: AdminVerifyCabinetPathParamsType
  Errors: any
}