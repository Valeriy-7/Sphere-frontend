'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/providers/auth-store';
import { WebSocketEvent } from './types';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
  sendTypingStatus: (chatId: string, isTyping: boolean) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  error: null,
  sendTypingStatus: () => {},
  joinChat: () => {},
  leaveChat: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authToken, activeCabinetId } = useAuthStore();
  const queryClient = useQueryClient();
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Инициализация подключения
  useEffect(() => {
    if (!authToken || !activeCabinetId) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // Функция создания подключения
    const connectSocket = () => {
      try {
        // Указываем правильный адрес сервера и namespace
        const socketIo = io(`${process.env.NEXT_PUBLIC_API_URL}/messenger`, {
          transports: ['websocket', 'polling'],
          auth: { token: authToken },
          query: { token: authToken },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
        });

        setSocket(socketIo);

        // Установка обработчиков событий
        socketIo.on('connect', () => {
          console.log('WebSocket подключен');
          setIsConnected(true);
          setError(null);

          // Очищаем таймер переподключения, если он был установлен
          if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
            reconnectTimerRef.current = null;
          }
        });

        socketIo.on('connect_error', (err) => {
          console.error('Ошибка подключения WebSocket:', err);
          setError(`Ошибка подключения: ${err.message}`);
          setIsConnected(false);
        });

        socketIo.on('disconnect', (reason) => {
          console.log('WebSocket отключен:', reason);
          setIsConnected(false);

          // Пытаемся переподключиться после долгого отключения
          if (reason === 'io server disconnect' || reason === 'transport close') {
            if (!reconnectTimerRef.current) {
              reconnectTimerRef.current = setTimeout(() => {
                console.log('Попытка переподключения...');
                socketIo.connect();
              }, 3000);
            }
          }
        });

        // События чата
        socketIo.on(WebSocketEvent.MESSAGE, (data) => {
          console.log('Получено новое сообщение:', data);

          // Проверяем сообщение и его источник
          if (data && data.chatId && data.message) {
            console.log(
              `Получено сообщение для чата ${data.chatId} от ${data.message.senderId || 'unknown'}, тип: ${data.message.type || 'text'}`,
            );

            // Отладочная информация о типе сообщения
            if (data.message.attachment) {
              console.log('Сообщение содержит вложение:', data.message.attachment);
            }
          }

          // Инвалидируем соответствующие запросы
          queryClient.invalidateQueries({ queryKey: ['messages', data.chatId] });
          queryClient.invalidateQueries({ queryKey: ['chats'] });

          // Автоматически присоединяемся к чату при получении нового сообщения
          // чтобы видеть последующие обновления
          socketIo.emit('join_chat', { chatId: data.chatId });
        });

        socketIo.on(WebSocketEvent.MESSAGE_READ, (data) => {
          console.log('Сообщения прочитаны:', data);
          queryClient.invalidateQueries({ queryKey: ['messages', data.chatId] });
          queryClient.invalidateQueries({ queryKey: ['chats'] });
        });

        socketIo.on(WebSocketEvent.CHAT_CREATED, (data) => {
          console.log('Создан новый чат:', data);
          queryClient.invalidateQueries({ queryKey: ['chats'] });
        });

        socketIo.on(WebSocketEvent.CHAT_UPDATED, (data) => {
          console.log('Обновление чата:', data);
          queryClient.invalidateQueries({ queryKey: ['chats'] });
        });

        socketIo.on('message_deleted', (data) => {
          console.log('Сообщение удалено:', data);
          queryClient.invalidateQueries({ queryKey: ['messages', data.chatId] });
        });

        return socketIo;
      } catch (err) {
        console.error('Ошибка создания WebSocket:', err);
        setError('Не удалось установить соединение');
        setIsConnected(false);
        return null;
      }
    };

    // Создаем подключение, если его нет
    const newSocket = connectSocket();

    // Очистка при размонтировании компонента
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
    };
  }, [authToken, activeCabinetId, queryClient]);

  // Функция отправки статуса печатания
  const sendTypingStatus = (chatId: string, isTyping: boolean) => {
    if (!socket || !isConnected) return;

    try {
      const event = isTyping ? WebSocketEvent.TYPING_START : WebSocketEvent.TYPING_STOP;
      socket.emit(event, { chatId });
    } catch (err) {
      console.error('Ошибка при отправке статуса печатания:', err);
    }
  };

  // Функция присоединения к комнате чата
  const joinChat = (chatId: string) => {
    if (!socket || !isConnected || !chatId) return;

    try {
      socket.emit('join_chat', { chatId });
    } catch (err) {
      console.error('Ошибка при присоединении к чату:', err);
    }
  };

  // Функция выхода из комнаты чата
  const leaveChat = (chatId: string) => {
    if (!socket || !isConnected || !chatId) return;

    try {
      socket.emit('leave_chat', { chatId });
    } catch (err) {
      console.error('Ошибка при выходе из чата:', err);
    }
  };

  const value = {
    socket,
    isConnected,
    error,
    sendTypingStatus,
    joinChat,
    leaveChat,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
