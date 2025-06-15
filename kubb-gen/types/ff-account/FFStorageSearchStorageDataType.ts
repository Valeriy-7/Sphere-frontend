export const FFStorageControllerSearchStorageDataQueryParamsSortByEnum = {
  name: 'name',
  totalQuantity: 'totalQuantity',
  totalDefects: 'totalDefects',
  totalProducts: 'totalProducts',
} as const

export type FFStorageSearchStorageDataQueryParamsSortByEnumType =
  (typeof FFStorageControllerSearchStorageDataQueryParamsSortByEnum)[keyof typeof FFStorageControllerSearchStorageDataQueryParamsSortByEnum]

export const FFStorageControllerSearchStorageDataQueryParamsSortOrderEnum = {
  asc: 'asc',
  desc: 'desc',
} as const

export type FFStorageSearchStorageDataQueryParamsSortOrderEnumType =
  (typeof FFStorageControllerSearchStorageDataQueryParamsSortOrderEnum)[keyof typeof FFStorageControllerSearchStorageDataQueryParamsSortOrderEnum]

export type FFStorageSearchStorageDataQueryParamsType = {
  /**
   * @description Search by supplier name or ID
   * @type string | undefined
   */
  search?: string
  /**
   * @description Minimum total quantity filter
   * @type number | undefined
   */
  minQuantity?: number
  /**
   * @description Maximum total quantity filter
   * @type number | undefined
   */
  maxQuantity?: number
  /**
   * @description Minimum defects filter
   * @type number | undefined
   */
  minDefects?: number
  /**
   * @description Maximum defects filter
   * @type number | undefined
   */
  maxDefects?: number
  /**
   * @description Sort field
   * @type string | undefined
   */
  sortBy?: FFStorageSearchStorageDataQueryParamsSortByEnumType
  /**
   * @description Sort order
   * @type string | undefined
   */
  sortOrder?: FFStorageSearchStorageDataQueryParamsSortOrderEnumType
}

/**
 * @description Filtered storage data
 */
export type FFStorageSearchStorageData200Type = any

export type FFStorageSearchStorageDataQueryResponseType = FFStorageSearchStorageData200Type

export type FFStorageSearchStorageDataTypeQuery = {
  Response: FFStorageSearchStorageData200Type
  QueryParams: FFStorageSearchStorageDataQueryParamsType
  Errors: any
}