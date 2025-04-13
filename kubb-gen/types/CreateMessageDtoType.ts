export const createMessageDtoTypeEnum = {
  TEXT: 'TEXT',
  VOICE: 'VOICE',
  FILE: 'FILE',
  EVENT: 'EVENT',
} as const;

export type CreateMessageDtoTypeEnumType =
  (typeof createMessageDtoTypeEnum)[keyof typeof createMessageDtoTypeEnum];

export type CreateMessageDtoType = {
  /**
   * @description ID чата
   * @type string
   */
  chatId: string;
  /**
   * @description Тип сообщения
   * @default "TEXT"
   * @type string
   */
  type: CreateMessageDtoTypeEnumType;
  /**
   * @description Текст сообщения
   * @type string | undefined
   */
  text?: string;
  /**
   * @description Массив ID вложений
   * @type string[] | undefined
   */
  attachmentIds?: string[];
  /**
   * @description URL для голосового сообщения
   * @type string | undefined
   */
  voiceUrl?: string;
};
