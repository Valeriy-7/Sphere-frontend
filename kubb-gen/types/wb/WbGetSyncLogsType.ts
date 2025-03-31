export type WbGetSyncLogsQueryParamsType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
}

/**
 * @description Логи успешно получены
 */
export type WbGetSyncLogs200Type = object

export type WbGetSyncLogsQueryResponseType = WbGetSyncLogs200Type

export type WbGetSyncLogsTypeQuery = {
  Response: WbGetSyncLogs200Type
  QueryParams: WbGetSyncLogsQueryParamsType
  Errors: any
}