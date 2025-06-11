export type AttachmentsGetFilePathParamsType = {
  /**
   * @description ID вложения файла
   * @type string
   */
  id: string
}

/**
 * @description Возвращает запрошенный файл
 */
export type AttachmentsGetFile200Type = any

/**
 * @description Файл не найден
 */
export type AttachmentsGetFile404Type = any

export type AttachmentsGetFileQueryResponseType = AttachmentsGetFile200Type

export type AttachmentsGetFileTypeQuery = {
  Response: AttachmentsGetFile200Type
  PathParams: AttachmentsGetFilePathParamsType
  Errors: AttachmentsGetFile404Type
}