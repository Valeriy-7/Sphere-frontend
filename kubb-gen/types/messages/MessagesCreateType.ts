import type { CreateMessageDtoType } from '../CreateMessageDtoType'

/**
 * @description Сообщение успешно создано
 */
export type MessagesCreate201Type = any

export type MessagesCreateMutationRequestType = CreateMessageDtoType

export type MessagesCreateMutationResponseType = MessagesCreate201Type

export type MessagesCreateTypeMutation = {
  Response: MessagesCreate201Type
  Request: MessagesCreateMutationRequestType
  Errors: any
}