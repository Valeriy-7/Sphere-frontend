import type { ProductListResponseDtoType } from '../ProductListResponseDtoType';

export type WbGetProductsQueryParamsType = {
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string;
  /**
   * @description Поисковый запрос для фильтрации по названию продукта
   * @type string | undefined
   */
  search?: string;
};

/**
 * @description Список продуктов успешно получен
 */
export type WbGetProducts200Type = ProductListResponseDtoType;

export type WbGetProductsQueryResponseType = WbGetProducts200Type;

export type WbGetProductsTypeQuery = {
  Response: WbGetProducts200Type;
  QueryParams: WbGetProductsQueryParamsType;
  Errors: any;
};
