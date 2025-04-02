'use client';

import { useState } from 'react';
import ChatList from './chat-list';
import MessageArea from './message-area';
import { User, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  isOnline: boolean;
  type?: 'user' | 'group' | 'service';
};

type Message = {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  isOwn: boolean;
  isRead?: boolean;
};

const demoChats: Chat[] = [
  {
    id: '1',
    name: 'adidas Александр',
    lastMessage: 'Ожидаем поставку!',
    time: '14:11',
    unread: 0,
    isOnline: true,
    type: 'user',
  },
  {
    id: '2',
    name: 'Игрушки Виктория',
    lastMessage: 'Товар принят на Фулфилмент',
    time: '10:31',
    unread: 2,
    isOnline: false,
    type: 'user',
  },
  {
    id: '3',
    name: 'ФФ Коробка Полина',
    lastMessage: 'Отличная новость!',
    time: 'Вчера',
    unread: 0,
    isOnline: true,
    type: 'service',
  },
];

const demoMessages: Message[] = [
  {
    id: '1',
    content: 'Добрый день! Ожидаем поставку!',
    timestamp: '11.09.24 14:46',
    sender: {
      id: '1',
      name: 'adidas Александр',
    },
    isOwn: false,
    isRead: true,
  },
  {
    id: '2',
    content: 'Событие № 3 Поставка на ВБ № 2 / 12.09.2024 / 2200 ед',
    timestamp: '11.09.24 14:11',
    sender: {
      id: 'system',
      name: 'Система',
    },
    isOwn: false,
    isRead: true,
  },
  {
    id: '3',
    content: 'Событие № 3 Поставка на ВБ № 2 / 12.09.2024 / 2200 ед - Товар принят на Фулфилмент',
    timestamp: '12.09.24 10:31',
    sender: {
      id: 'system',
      name: 'Система',
    },
    isOwn: false,
    isRead: true,
  },
];

const MessengerUI = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(demoChats[0]);
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [filterType, setFilterType] = useState<'all' | 'ff' | 'wb'>('all');

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date()
        .toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })
        .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, '$1.$2.$3 $4'),
      sender: {
        id: 'current-user',
        name: 'Я',
      },
      isOwn: true,
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-full rounded-lg border">
      <div className="w-80 rounded-l-lg border-r bg-white shadow-md">
        <div className="border-b p-3">
          <div className="mb-4 text-lg font-medium">Мессенджер</div>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск" className="border-muted bg-secondary pl-8" />
          </div>
          <div className="mb-2 flex space-x-2">
            <Button
              variant={filterType === 'all' ? 'secondary' : 'ghost'}
              className="flex-1 bg-secondary/80 text-xs"
              onClick={() => setFilterType('all')}
            >
              Все поставки
            </Button>
            <Button
              variant={filterType === 'ff' ? 'secondary' : 'ghost'}
              className="flex-1 text-xs"
              onClick={() => setFilterType('ff')}
            >
              Поставки на ФФ
            </Button>
            <Button
              variant={filterType === 'wb' ? 'secondary' : 'ghost'}
              className="flex-1 text-xs"
              onClick={() => setFilterType('wb')}
            >
              Поставки на ВБ
            </Button>
          </div>
        </div>
        <ChatList chats={demoChats} selectedChat={selectedChat} onSelectChat={handleSelectChat} />
      </div>
      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <MessageArea chat={selectedChat} messages={messages} onSendMessage={handleSendMessage} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
            <User size={64} className="mb-4 opacity-30" />
            <p>Выберите чат, чтобы начать общение</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerUI;
