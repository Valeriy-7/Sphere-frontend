export type AttachmentsGetPublicImagePathParamsType = {
  /**
   * @description ID вложения с изображением
   * @type string
   */
  id: string
}

/**
 * @description Возвращает изображение
 */
export type AttachmentsGetPublicImage200Type = any

/**
 * @description Изображение не найдено или нет доступа
 */
export type AttachmentsGetPublicImage404Type = any

export type AttachmentsGetPublicImageQueryResponseType = AttachmentsGetPublicImage200Type

export type AttachmentsGetPublicImageTypeQuery = {
  Response: AttachmentsGetPublicImage200Type
  PathParams: AttachmentsGetPublicImagePathParamsType
  Errors: AttachmentsGetPublicImage404Type
}