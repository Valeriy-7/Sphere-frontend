import type { PartnersResponseDtoType } from '../PartnersResponseDtoType'

export const cabinetsControllerGetAvailablePartnersQueryParamsTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const

export type CabinetsGetAvailablePartnersQueryParamsTypeEnumType =
  (typeof cabinetsControllerGetAvailablePartnersQueryParamsTypeEnum)[keyof typeof cabinetsControllerGetAvailablePartnersQueryParamsTypeEnum]

export const cabinetsControllerGetAvailablePartnersQueryParamsSortByEnum = {
  createdAt: 'createdAt',
  companyName: 'companyName',
  number1: 'number1',
  type: 'type',
} as const

export type CabinetsGetAvailablePartnersQueryParamsSortByEnumType =
  (typeof cabinetsControllerGetAvailablePartnersQueryParamsSortByEnum)[keyof typeof cabinetsControllerGetAvailablePartnersQueryParamsSortByEnum]

export const cabinetsControllerGetAvailablePartnersQueryParamsSortOrderEnum = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export type CabinetsGetAvailablePartnersQueryParamsSortOrderEnumType =
  (typeof cabinetsControllerGetAvailablePartnersQueryParamsSortOrderEnum)[keyof typeof cabinetsControllerGetAvailablePartnersQueryParamsSortOrderEnum]

export type CabinetsGetAvailablePartnersQueryParamsType = {
  /**
   * @description Поиск по названию компании
   * @type string | undefined
   */
  search?: string
  /**
   * @description Тип организации
   * @type string | undefined
   */
  type?: CabinetsGetAvailablePartnersQueryParamsTypeEnumType
  /**
   * @description Поле для сортировки
   * @default "createdAt"
   * @type string | undefined
   */
  sortBy?: CabinetsGetAvailablePartnersQueryParamsSortByEnumType
  /**
   * @description Порядок сортировки
   * @default "DESC"
   * @type string | undefined
   */
  sortOrder?: CabinetsGetAvailablePartnersQueryParamsSortOrderEnumType
  /**
   * @description Номер страницы
   * @minLength 1
   * @default 1
   * @type number | undefined
   */
  page?: number
  /**
   * @description Количество элементов на странице. Используйте -1 для получения всех записей.
   * @minLength -1
   * @maxLength 100
   * @default 10
   * @type number | undefined
   */
  limit?: number
}

/**
 * @description Список доступных кабинетов
 */
export type CabinetsGetAvailablePartners200Type = PartnersResponseDtoType

export type CabinetsGetAvailablePartnersQueryResponseType = CabinetsGetAvailablePartners200Type

export type CabinetsGetAvailablePartnersTypeQuery = {
  Response: CabinetsGetAvailablePartners200Type
  QueryParams: CabinetsGetAvailablePartnersQueryParamsType
  Errors: any
}