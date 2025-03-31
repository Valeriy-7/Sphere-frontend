import type { ToggleFavoriteDtoType } from '../ToggleFavoriteDtoType'

/**
 * @description Статус избранного успешно изменен
 */
export type MessagesToggleFavorite200Type = any

export type MessagesToggleFavoriteMutationRequestType = ToggleFavoriteDtoType

export type MessagesToggleFavoriteMutationResponseType = MessagesToggleFavorite200Type

export type MessagesToggleFavoriteTypeMutation = {
  Response: MessagesToggleFavorite200Type
  Request: MessagesToggleFavoriteMutationRequestType
  Errors: any
}