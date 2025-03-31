export type MessagesFindAttachmentsQueryParamsType = {
  /**
   * @description ID чата
   * @type string
   */
  chatId: string
  /**
   * @description Количество вложений на странице
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
 * @description Список вложений успешно получен
 */
export type MessagesFindAttachments200Type = any

export type MessagesFindAttachmentsQueryResponseType = MessagesFindAttachments200Type

export type MessagesFindAttachmentsTypeQuery = {
  Response: MessagesFindAttachments200Type
  QueryParams: MessagesFindAttachmentsQueryParamsType
  Errors: any
}