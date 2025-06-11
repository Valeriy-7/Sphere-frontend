import type { MessageType } from '../MessageType'

export type MessagesFindAllPathParamsType = {
  /**
   * @type string
   */
  chatId: string
}

/**
 * @description Список сообщений успешно получен
 */
export type MessagesFindAll200Type = MessageType[]

export type MessagesFindAllQueryResponseType = MessagesFindAll200Type

export type MessagesFindAllTypeQuery = {
  Response: MessagesFindAll200Type
  PathParams: MessagesFindAllPathParamsType
  Errors: any
}