export type AttachmentsGetPublicVoiceMessagePathParamsType = {
  /**
   * @description ID вложения голосового сообщения
   * @type string
   */
  id: string
}

/**
 * @description Возвращает аудиофайл
 */
export type AttachmentsGetPublicVoiceMessage200Type = any

/**
 * @description Голосовое сообщение не найдено
 */
export type AttachmentsGetPublicVoiceMessage404Type = any

export type AttachmentsGetPublicVoiceMessageQueryResponseType = AttachmentsGetPublicVoiceMessage200Type

export type AttachmentsGetPublicVoiceMessageTypeQuery = {
  Response: AttachmentsGetPublicVoiceMessage200Type
  PathParams: AttachmentsGetPublicVoiceMessagePathParamsType
  Errors: AttachmentsGetPublicVoiceMessage404Type
}