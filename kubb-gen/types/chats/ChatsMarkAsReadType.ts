import type { MarkAsReadDtoType } from '../MarkAsReadDtoType';

/**
 * @description Сообщения успешно отмечены как прочитанные
 */
export type ChatsMarkAsRead200Type = any;

export type ChatsMarkAsReadMutationRequestType = MarkAsReadDtoType;

export type ChatsMarkAsReadMutationResponseType = ChatsMarkAsRead200Type;

export type ChatsMarkAsReadTypeMutation = {
  Response: ChatsMarkAsRead200Type;
  Request: ChatsMarkAsReadMutationRequestType;
  Errors: any;
};
