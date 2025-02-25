export type LogisticsDeleteServicePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Услуга успешно удалена
 */
export type LogisticsDeleteService200Type = any

export type LogisticsDeleteServiceMutationResponseType = LogisticsDeleteService200Type

export type LogisticsDeleteServiceTypeMutation = {
  Response: LogisticsDeleteService200Type
  PathParams: LogisticsDeleteServicePathParamsType
  Errors: any
}