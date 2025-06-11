import type { CreateChatDtoType } from '../CreateChatDtoType'

/**
 * @description Чат успешно создан
 */
export type ChatsCreate201Type = any

export type ChatsCreateMutationRequestType = CreateChatDtoType

export type ChatsCreateMutationResponseType = ChatsCreate201Type

export type ChatsCreateTypeMutation = {
  Response: ChatsCreate201Type
  Request: ChatsCreateMutationRequestType
  Errors: any
}