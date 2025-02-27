export type LogisticsDeleteConsumablePathParamsType = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description Расходник успешно удален
 */
export type LogisticsDeleteConsumable200Type = any;

export type LogisticsDeleteConsumableMutationResponseType = LogisticsDeleteConsumable200Type;

export type LogisticsDeleteConsumableTypeMutation = {
  Response: LogisticsDeleteConsumable200Type;
  PathParams: LogisticsDeleteConsumablePathParamsType;
  Errors: any;
};
