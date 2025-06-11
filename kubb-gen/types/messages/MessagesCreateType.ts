import type { CreateMessageDtoType } from '../CreateMessageDtoType'
import type { MessageType } from '../MessageType'

/**
 * @description Сообщение успешно создано
 */
export type MessagesCreate201Type = MessageType

export type MessagesCreateMutationRequestType = CreateMessageDtoType

export type MessagesCreateMutationResponseType = MessagesCreate201Type

export type MessagesCreateTypeMutation = {
  Response: MessagesCreate201Type
  Request: MessagesCreateMutationRequestType
  Errors: any
}