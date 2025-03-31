export type ChatsFindAllQueryParamsType = {
  /**
   * @description Количество чатов на странице
   * @default 20
   * @type number
   */
  limit: number
  /**
   * @description Смещение (для пагинации)
   * @default 0
   * @type number
   */
  offset: number
  /**
   * @description Поисковый запрос
   * @type string | undefined
   */
  search?: string
}

/**
 * @description Список чатов успешно получен
 */
export type ChatsFindAll200Type = any

export type ChatsFindAllQueryResponseType = ChatsFindAll200Type

export type ChatsFindAllTypeQuery = {
  Response: ChatsFindAll200Type
  QueryParams: ChatsFindAllQueryParamsType
  Errors: any
}