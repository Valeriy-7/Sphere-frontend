import type { ListResponseDtoType } from '../ListResponseDtoType'

export const adminControllerGetListQueryParamsModeEnum = {
  all: 'all',
  requests: 'requests',
  blocked: 'blocked',
} as const

export type AdminGetListQueryParamsModeEnumType = (typeof adminControllerGetListQueryParamsModeEnum)[keyof typeof adminControllerGetListQueryParamsModeEnum]

export const adminControllerGetListQueryParamsTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const

export type AdminGetListQueryParamsTypeEnumType = (typeof adminControllerGetListQueryParamsTypeEnum)[keyof typeof adminControllerGetListQueryParamsTypeEnum]

export const adminControllerGetListQueryParamsSortFieldEnum = {
  createdAt: 'createdAt',
  type: 'type',
  companyName: 'companyName',
  isVerified: 'isVerified',
} as const

export type AdminGetListQueryParamsSortFieldEnumType =
  (typeof adminControllerGetListQueryParamsSortFieldEnum)[keyof typeof adminControllerGetListQueryParamsSortFieldEnum]

export type AdminGetListQueryParamsType = {
  /**
   * @description Режим отображения
   * @type string | undefined
   */
  mode?: AdminGetListQueryParamsModeEnumType
  /**
   * @description Поисковый запрос (ФИО, ИНН, название организации)
   * @type string | undefined
   */
  search?: string
  /**
   * @description Тип организации
   * @type string | undefined
   */
  type?: AdminGetListQueryParamsTypeEnumType
  /**
   * @description Дата начала периода
   * @type string | undefined
   */
  dateFrom?: string
  /**
   * @description Дата конца периода
   * @type string | undefined
   */
  dateTo?: string
  /**
   * @description Номер страницы
   * @type number | undefined
   */
  page?: number
  /**
   * @description Количество элементов на странице. Значение -1 вернет все элементы без пагинации.
   * @type number | undefined
   */
  limit?: number
  /**
   * @description Поле для сортировки
   * @type string | undefined
   */
  sortField?: AdminGetListQueryParamsSortFieldEnumType
  /**
   * @description Направление сортировки (по убыванию)
   * @type boolean | undefined
   */
  sortDesc?: boolean
}

/**
 * @description Список успешно получен
 */
export type AdminGetList200Type = ListResponseDtoType

export type AdminGetListQueryResponseType = AdminGetList200Type

export type AdminGetListTypeQuery = {
  Response: AdminGetList200Type
  QueryParams: AdminGetListQueryParamsType
  Errors: any
}