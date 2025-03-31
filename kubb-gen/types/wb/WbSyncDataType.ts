export type WbSyncDataQueryParamsType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
}

/**
 * @description Синхронизация успешно выполнена
 */
export type WbSyncData200Type = any

export type WbSyncDataQueryResponseType = WbSyncData200Type

export type WbSyncDataTypeQuery = {
  Response: WbSyncData200Type
  QueryParams: WbSyncDataQueryParamsType
  Errors: any
}