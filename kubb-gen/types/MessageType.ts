export const messageTypeEnum = {
  TEXT: 'TEXT',
  VOICE: 'VOICE',
  FILE: 'FILE',
  EVENT: 'EVENT',
  ATTACHMENT: 'ATTACHMENT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
} as const

export type MessageTypeEnumType = (typeof messageTypeEnum)[keyof typeof messageTypeEnum]

export type MessageType = {
  /**
   * @description ID сообщения
   * @type string
   */
  id: string
  /**
   * @description Текст сообщения
   * @type string
   */
  text: string
  /**
   * @description ID чата
   * @type string
   */
  chatId: string
  /**
   * @description ID отправителя
   * @type string
   */
  senderId: string
  /**
   * @description Тип сообщения
   * @default "TEXT"
   * @type string
   */
  type: MessageTypeEnumType
}