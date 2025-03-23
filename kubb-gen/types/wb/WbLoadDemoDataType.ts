export type WbLoadDemoDataQueryParamsType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string;
};

/**
 * @description Тестовые данные успешно загружены
 */
export type WbLoadDemoData200Type = any;

export type WbLoadDemoDataQueryResponseType = WbLoadDemoData200Type;

export type WbLoadDemoDataTypeQuery = {
  Response: WbLoadDemoData200Type;
  QueryParams: WbLoadDemoDataQueryParamsType;
  Errors: any;
};
