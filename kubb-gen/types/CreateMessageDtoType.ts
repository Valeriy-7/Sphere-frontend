export const createMessageDtoTypeEnum = {
  TEXT: 'TEXT',
  VOICE: 'VOICE',
  FILE: 'FILE',
  EVENT: 'EVENT',
  ATTACHMENT: 'ATTACHMENT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
} as const

export type CreateMessageDtoTypeEnumType = (typeof createMessageDtoTypeEnum)[keyof typeof createMessageDtoTypeEnum]

export type CreateMessageDtoType = {
  /**
   * @description ID чата
   * @type string
   */
  chatId: string
  /**
   * @description Тип сообщения
   * @default "TEXT"
   * @type string
   */
  type: CreateMessageDtoTypeEnumType
  /**
   * @description Текст сообщения
   * @type string | undefined
   */
  text?: string
  /**
   * @description Идентификаторы вложений
   * @type array | undefined
   */
  attachmentIds?: string[]
}