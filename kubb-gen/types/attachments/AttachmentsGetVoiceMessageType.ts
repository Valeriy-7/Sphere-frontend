export type AttachmentsGetVoiceMessagePathParamsType = {
  /**
   * @description ID вложения голосового сообщения
   * @type string
   */
  id: string
}

/**
 * @description Возвращает аудиофайл
 */
export type AttachmentsGetVoiceMessage200Type = any

/**
 * @description Голосовое сообщение не найдено
 */
export type AttachmentsGetVoiceMessage404Type = any

export type AttachmentsGetVoiceMessageQueryResponseType = AttachmentsGetVoiceMessage200Type

export type AttachmentsGetVoiceMessageTypeQuery = {
  Response: AttachmentsGetVoiceMessage200Type
  PathParams: AttachmentsGetVoiceMessagePathParamsType
  Errors: AttachmentsGetVoiceMessage404Type
}