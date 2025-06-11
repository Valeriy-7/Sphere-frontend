/**
 * @description Изображение успешно загружено
 */
export type AttachmentsUploadImage201Type = any

export type AttachmentsUploadImageMutationRequestType = {
  /**
   * @type string | undefined, binary
   */
  file?: Blob
  /**
   * @type string | undefined
   */
  chatId?: string
  /**
   * @type string | undefined
   */
  text?: string
}

export type AttachmentsUploadImageMutationResponseType = AttachmentsUploadImage201Type

export type AttachmentsUploadImageTypeMutation = {
  Response: AttachmentsUploadImage201Type
  Request: AttachmentsUploadImageMutationRequestType
  Errors: any
}