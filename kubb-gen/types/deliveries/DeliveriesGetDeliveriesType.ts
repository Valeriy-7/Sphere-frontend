export type DeliveriesGetDeliveriesQueryParamsType = {
  /**
   * @description Дата начала периода
   * @type string | undefined
   */
  startDate?: string;
  /**
   * @description Дата окончания периода
   * @type string | undefined
   */
  endDate?: string;
};

export type DeliveriesGetDeliveries200Type = any;

export type DeliveriesGetDeliveriesQueryResponseType = DeliveriesGetDeliveries200Type;

export type DeliveriesGetDeliveriesTypeQuery = {
  Response: DeliveriesGetDeliveries200Type;
  QueryParams: DeliveriesGetDeliveriesQueryParamsType;
  Errors: any;
};
