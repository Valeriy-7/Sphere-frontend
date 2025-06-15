export const wbStorageControllerSearchWbStorageDataQueryParamsSortOrderEnum = {
  asc: 'asc',
  desc: 'desc',
} as const

export type WbStorageSearchWbStorageDataQueryParamsSortOrderEnumType =
  (typeof wbStorageControllerSearchWbStorageDataQueryParamsSortOrderEnum)[keyof typeof wbStorageControllerSearchWbStorageDataQueryParamsSortOrderEnum]

export const wbStorageControllerSearchWbStorageDataQueryParamsSortByEnum = {
  name: 'name',
  totalQuantity: 'totalQuantity',
  totalDefects: 'totalDefects',
  totalProducts: 'totalProducts',
} as const

export type WbStorageSearchWbStorageDataQueryParamsSortByEnumType =
  (typeof wbStorageControllerSearchWbStorageDataQueryParamsSortByEnum)[keyof typeof wbStorageControllerSearchWbStorageDataQueryParamsSortByEnum]

export type WbStorageSearchWbStorageDataQueryParamsType = {
  /**
   * @description Sort order
   * @type string | undefined
   */
  sortOrder?: WbStorageSearchWbStorageDataQueryParamsSortOrderEnumType
  /**
   * @description Sort field
   * @type string | undefined
   */
  sortBy?: WbStorageSearchWbStorageDataQueryParamsSortByEnumType
  /**
   * @description Maximum defects filter
   * @type number | undefined
   */
  maxDefects?: number
  /**
   * @description Minimum defects filter
   * @type number | undefined
   */
  minDefects?: number
  /**
   * @description Maximum total quantity filter
   * @type number | undefined
   */
  maxQuantity?: number
  /**
   * @description Minimum total quantity filter
   * @type number | undefined
   */
  minQuantity?: number
  /**
   * @description Search by product name or article
   * @type string | undefined
   */
  search?: string
}

/**
 * @description Filtered WB storage data
 */
export type WbStorageSearchWbStorageData200Type = any

export type WbStorageSearchWbStorageDataQueryResponseType = WbStorageSearchWbStorageData200Type

export type WbStorageSearchWbStorageDataTypeQuery = {
  Response: WbStorageSearchWbStorageData200Type
  QueryParams: WbStorageSearchWbStorageDataQueryParamsType
  Errors: any
}