export type WbResetDataQueryParamsType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
}

/**
 * @description Данные успешно сброшены и синхронизированы
 */
export type WbResetData200Type = any

export type WbResetDataQueryResponseType = WbResetData200Type

export type WbResetDataTypeQuery = {
  Response: WbResetData200Type
  QueryParams: WbResetDataQueryParamsType
  Errors: any
}