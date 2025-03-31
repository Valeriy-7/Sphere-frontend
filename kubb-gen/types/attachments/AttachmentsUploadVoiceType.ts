/**
 * @description Голосовое сообщение успешно загружено
 */
export type AttachmentsUploadVoice201Type = any

export type AttachmentsUploadVoiceMutationRequestType = {
  /**
   * @type string | undefined, binary
   */
  file?: Blob
  /**
   * @type string | undefined
   */
  chatId?: string
  /**
   * @type number | undefined
   */
  duration?: number
}

export type AttachmentsUploadVoiceMutationResponseType = AttachmentsUploadVoice201Type

export type AttachmentsUploadVoiceTypeMutation = {
  Response: AttachmentsUploadVoice201Type
  Request: AttachmentsUploadVoiceMutationRequestType
  Errors: any
}