export type AttachmentsGetPublicFilePathParamsType = {
  /**
   * @description ID вложения файла
   * @type string
   */
  id: string
}

/**
 * @description Возвращает запрошенный файл
 */
export type AttachmentsGetPublicFile200Type = any

/**
 * @description Файл не найден или нет доступа
 */
export type AttachmentsGetPublicFile404Type = any

export type AttachmentsGetPublicFileQueryResponseType = AttachmentsGetPublicFile200Type

export type AttachmentsGetPublicFileTypeQuery = {
  Response: AttachmentsGetPublicFile200Type
  PathParams: AttachmentsGetPublicFilePathParamsType
  Errors: AttachmentsGetPublicFile404Type
}