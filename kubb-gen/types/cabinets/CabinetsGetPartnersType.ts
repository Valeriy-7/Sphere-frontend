import type { PartnersResponseDtoType } from '../PartnersResponseDtoType';

export const cabinetsControllerGetPartnersQueryParamsTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const;

export type CabinetsGetPartnersQueryParamsTypeEnumType =
  (typeof cabinetsControllerGetPartnersQueryParamsTypeEnum)[keyof typeof cabinetsControllerGetPartnersQueryParamsTypeEnum];

export const cabinetsControllerGetPartnersQueryParamsSortByEnum = {
  createdAt: 'createdAt',
  companyName: 'companyName',
  number1: 'number1',
  type: 'type',
} as const;

export type CabinetsGetPartnersQueryParamsSortByEnumType =
  (typeof cabinetsControllerGetPartnersQueryParamsSortByEnum)[keyof typeof cabinetsControllerGetPartnersQueryParamsSortByEnum];

export const cabinetsControllerGetPartnersQueryParamsSortOrderEnum = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type CabinetsGetPartnersQueryParamsSortOrderEnumType =
  (typeof cabinetsControllerGetPartnersQueryParamsSortOrderEnum)[keyof typeof cabinetsControllerGetPartnersQueryParamsSortOrderEnum];

export type CabinetsGetPartnersQueryParamsType = {
  /**
   * @description Поиск по названию компании
   * @type string | undefined
   */
  search?: string;
  /**
   * @description Тип организации
   * @type string | undefined
   */
  type?: CabinetsGetPartnersQueryParamsTypeEnumType;
  /**
   * @description Поле для сортировки
   * @default "createdAt"
   * @type string | undefined
   */
  sortBy?: CabinetsGetPartnersQueryParamsSortByEnumType;
  /**
   * @description Порядок сортировки
   * @default "DESC"
   * @type string | undefined
   */
  sortOrder?: CabinetsGetPartnersQueryParamsSortOrderEnumType;
  /**
   * @description Номер страницы
   * @minLength 1
   * @default 1
   * @type number | undefined
   */
  page?: number;
  /**
   * @description Количество элементов на странице. Используйте -1 для получения всех записей.
   * @minLength -1
   * @maxLength 100
   * @default 10
   * @type number | undefined
   */
  limit?: number;
};

/**
 * @description Список партнерских кабинетов
 */
export type CabinetsGetPartners200Type = PartnersResponseDtoType;

export type CabinetsGetPartnersQueryResponseType = CabinetsGetPartners200Type;

export type CabinetsGetPartnersTypeQuery = {
  Response: CabinetsGetPartners200Type;
  QueryParams: CabinetsGetPartnersQueryParamsType;
  Errors: any;
};
