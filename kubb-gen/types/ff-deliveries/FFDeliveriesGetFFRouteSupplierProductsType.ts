import type { FFDeliveryProductDtoType } from '../FFDeliveryProductDtoType';

export type FFDeliveriesGetFFRouteSupplierProductsPathParamsType = {
  /**
   * @description ID маршрута
   * @type string, uuid
   */
  routeId: string;
  /**
   * @description ID поставщика
   * @type string, uuid
   */
  supplierId: string;
};

/**
 * @description Список товаров поставщика по маршруту успешно получен
 */
export type FFDeliveriesGetFFRouteSupplierProducts200Type = FFDeliveryProductDtoType[];

/**
 * @description Неверный запрос (например, неверный формат UUID)
 */
export type FFDeliveriesGetFFRouteSupplierProducts400Type = any;

/**
 * @description Не авторизован
 */
export type FFDeliveriesGetFFRouteSupplierProducts401Type = any;

/**
 * @description Маршрут или поставщик не найден
 * @example [object Object]
 */
export type FFDeliveriesGetFFRouteSupplierProducts404Type = any;

export type FFDeliveriesGetFFRouteSupplierProductsQueryResponseType =
  FFDeliveriesGetFFRouteSupplierProducts200Type;

export type FFDeliveriesGetFFRouteSupplierProductsTypeQuery = {
  Response: FFDeliveriesGetFFRouteSupplierProducts200Type;
  PathParams: FFDeliveriesGetFFRouteSupplierProductsPathParamsType;
  Errors:
    | FFDeliveriesGetFFRouteSupplierProducts400Type
    | FFDeliveriesGetFFRouteSupplierProducts401Type
    | FFDeliveriesGetFFRouteSupplierProducts404Type;
};
