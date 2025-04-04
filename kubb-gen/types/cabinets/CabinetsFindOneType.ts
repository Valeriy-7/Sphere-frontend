import type { CabinetResponseDtoType } from '../CabinetResponseDtoType'

export type CabinetsFindOnePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Информация о кабинете успешно получена
 */
export type CabinetsFindOne200Type = CabinetResponseDtoType

/**
 * @description Кабинет не найден
 */
export type CabinetsFindOne404Type = any

export type CabinetsFindOneQueryResponseType = CabinetsFindOne200Type

export type CabinetsFindOneTypeQuery = {
  Response: CabinetsFindOne200Type
  PathParams: CabinetsFindOnePathParamsType
  Errors: CabinetsFindOne404Type
}