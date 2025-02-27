import type { CreateLogisticsDtoType } from '../CreateLogisticsDtoType';
import type { LogisticsType } from '../LogisticsType';

/**
 * @description Логистика успешно создана
 */
export type LogisticsCreateLogistics201Type = LogisticsType;

export type LogisticsCreateLogisticsMutationRequestType = CreateLogisticsDtoType;

export type LogisticsCreateLogisticsMutationResponseType = LogisticsCreateLogistics201Type;

export type LogisticsCreateLogisticsTypeMutation = {
  Response: LogisticsCreateLogistics201Type;
  Request: LogisticsCreateLogisticsMutationRequestType;
  Errors: any;
};
