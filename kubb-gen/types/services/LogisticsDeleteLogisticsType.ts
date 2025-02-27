export type LogisticsDeleteLogisticsPathParamsType = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description Логистика успешно удалена
 */
export type LogisticsDeleteLogistics200Type = any;

export type LogisticsDeleteLogisticsMutationResponseType = LogisticsDeleteLogistics200Type;

export type LogisticsDeleteLogisticsTypeMutation = {
  Response: LogisticsDeleteLogistics200Type;
  PathParams: LogisticsDeleteLogisticsPathParamsType;
  Errors: any;
};
