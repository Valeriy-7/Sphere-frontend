export type AttachmentsGetImagePathParamsType = {
  /**
   * @description ID вложения с изображением
   * @type string
   */
  id: string
}

/**
 * @description Возвращает изображение
 */
export type AttachmentsGetImage200Type = any

/**
 * @description Изображение не найдено
 */
export type AttachmentsGetImage404Type = any

export type AttachmentsGetImageQueryResponseType = AttachmentsGetImage200Type

export type AttachmentsGetImageTypeQuery = {
  Response: AttachmentsGetImage200Type
  PathParams: AttachmentsGetImagePathParamsType
  Errors: AttachmentsGetImage404Type
}