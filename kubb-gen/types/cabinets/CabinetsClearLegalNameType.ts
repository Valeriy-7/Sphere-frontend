export type CabinetsClearLegalNamePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Поле legalCompanyName успешно очищено
 */
export type CabinetsClearLegalName200Type = boolean

/**
 * @description Ошибка при очистке поля
 */
export type CabinetsClearLegalName400Type = any

export type CabinetsClearLegalNameMutationResponseType = CabinetsClearLegalName200Type

export type CabinetsClearLegalNameTypeMutation = {
  Response: CabinetsClearLegalName200Type
  PathParams: CabinetsClearLegalNamePathParamsType
  Errors: CabinetsClearLegalName400Type
}