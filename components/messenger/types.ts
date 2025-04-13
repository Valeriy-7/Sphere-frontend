import { ChatsFindAllQueryResponseType, MessagesFindAllQueryResponseType } from '@/kubb-gen';

export type Chat = ChatsFindAllQueryResponseType['items'][0];
export type Message = MessagesFindAllQueryResponseType['items'][0];

export enum DeliveryFilter {
  ALL = 'ALL',
  FF = 'FF',
  WB = 'WB',
}

export enum WebSocketEvent {
  // Connection events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',

  // Message events
  MESSAGE = 'message',
  MESSAGE_READ = 'message_read',
  MESSAGE_DELIVERED = 'message_delivered',
  MESSAGE_FAVORITE = 'message_favorite',

  // Chat events
  CHAT_CREATED = 'chat_created',
  CHAT_UPDATED = 'chat_updated',
  CHAT_DELETED = 'chat_deleted',

  // Typing events
  TYPING_START = 'typing_start',
  TYPING_STOP = 'typing_stop',

  // Connection status events
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
}

export interface WebSocketPayload {
  [WebSocketEvent.MESSAGE]: {
    message: Message;
    chatId: string;
  };

  [WebSocketEvent.MESSAGE_READ]: {
    messageIds: string[];
    chatId: string;
    readBy: string;
  };

  [WebSocketEvent.MESSAGE_DELIVERED]: {
    messageIds: string[];
    chatId: string;
    deliveredTo: string;
  };

  [WebSocketEvent.MESSAGE_FAVORITE]: {
    messageId: string;
    chatId: string;
    isFavorite: boolean;
  };

  [WebSocketEvent.CHAT_CREATED]: {
    chat: Chat;
  };

  [WebSocketEvent.CHAT_UPDATED]: {
    chat: Chat;
  };

  [WebSocketEvent.CHAT_DELETED]: {
    chatId: string;
  };

  [WebSocketEvent.TYPING_START]: {
    chatId: string;
    userId: string;
  };

  [WebSocketEvent.TYPING_STOP]: {
    chatId: string;
    userId: string;
  };

  [WebSocketEvent.USER_ONLINE]: {
    userId: string;
  };

  [WebSocketEvent.USER_OFFLINE]: {
    userId: string;
    lastSeen: string;
  };
}

// Helper type to extract payload type for a specific event
export type PayloadType<E extends keyof WebSocketPayload> = WebSocketPayload[E];
