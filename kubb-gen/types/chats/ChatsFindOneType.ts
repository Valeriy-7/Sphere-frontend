export type ChatsFindOnePathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Информация о чате успешно получена
 */
export type ChatsFindOne200Type = any

export type ChatsFindOneQueryResponseType = ChatsFindOne200Type

export type ChatsFindOneTypeQuery = {
  Response: ChatsFindOne200Type
  PathParams: ChatsFindOnePathParamsType
  Errors: any
}