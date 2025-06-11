export type LogisticsTypeDeleteLogisticsTypePathParamsType = {
  /**
   * @description ID типа логистики
   * @type string
   */
  id: string
}

/**
 * @description Тип логистики успешно удален
 */
export type LogisticsTypeDeleteLogisticsType200Type = any

export type LogisticsTypeDeleteLogisticsTypeMutationResponseType = LogisticsTypeDeleteLogisticsType200Type

export type LogisticsTypeDeleteLogisticsTypeTypeMutation = {
  Response: LogisticsTypeDeleteLogisticsType200Type
  PathParams: LogisticsTypeDeleteLogisticsTypePathParamsType
  Errors: any
}