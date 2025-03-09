import type { LogisticsPriceDtoType } from '../LogisticsPriceDtoType';

export const logisticsPriceControllerGetLogisticsPriceQueryParamsToPointTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const;

export type LogisticsPriceGetLogisticsPriceQueryParamsToPointTypeEnumType =
  (typeof logisticsPriceControllerGetLogisticsPriceQueryParamsToPointTypeEnum)[keyof typeof logisticsPriceControllerGetLogisticsPriceQueryParamsToPointTypeEnum];

export type LogisticsPriceGetLogisticsPriceQueryParamsType = {
  /**
   * @description ID поставщика
   * @type string
   */
  supplierId: string;
  /**
   * @description Тип точки назначения (необязательно, будет использован тип FULFILLMENT)
   * @type string | undefined
   */
  toPointType?: LogisticsPriceGetLogisticsPriceQueryParamsToPointTypeEnumType;
};

/**
 * @description Информация о цене логистики
 */
export type LogisticsPriceGetLogisticsPrice200Type = LogisticsPriceDtoType;

/**
 * @description Логистика между указанными точками не найдена
 */
export type LogisticsPriceGetLogisticsPrice404Type = any;

export type LogisticsPriceGetLogisticsPriceQueryResponseType =
  LogisticsPriceGetLogisticsPrice200Type;

export type LogisticsPriceGetLogisticsPriceTypeQuery = {
  Response: LogisticsPriceGetLogisticsPrice200Type;
  QueryParams: LogisticsPriceGetLogisticsPriceQueryParamsType;
  Errors: LogisticsPriceGetLogisticsPrice404Type;
};
