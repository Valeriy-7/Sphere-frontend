export type WbGetSyncStatusQueryParamsType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
}

/**
 * @description Статус синхронизации получен
 */
export type WbGetSyncStatus200Type = any

export type WbGetSyncStatusQueryResponseType = WbGetSyncStatus200Type

export type WbGetSyncStatusTypeQuery = {
  Response: WbGetSyncStatus200Type
  QueryParams: WbGetSyncStatusQueryParamsType
  Errors: any
}