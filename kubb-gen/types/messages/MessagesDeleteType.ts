export type MessagesDeletePathParamsType = {
  /**
   * @type string
   */
  messageId: string
}

/**
 * @description Сообщение успешно удалено
 */
export type MessagesDelete200Type = any

export type MessagesDeleteMutationResponseType = MessagesDelete200Type

export type MessagesDeleteTypeMutation = {
  Response: MessagesDelete200Type
  PathParams: MessagesDeletePathParamsType
  Errors: any
}