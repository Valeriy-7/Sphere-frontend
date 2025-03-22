'use client';

import { useState } from 'react';
import ChatList from './chat-list';
import MessageArea from './message-area';
import { User } from 'lucide-react';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  isOnline: boolean;
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
};

const demoChats: Chat[] = [
  {
    id: '1',
    name: 'Александр Петров',
    lastMessage: 'Привет, как дела?',
    time: '10:45',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Мария Иванова',
    lastMessage: 'Документы отправлены',
    time: 'Вчера',
    unread: 0,
    isOnline: false,
  },
];

const demoMessages: Message[] = [
  {
    id: '1',
    content: 'Привет, как дела?',
    timestamp: '10:45',
    sender: {
      id: '1',
      name: 'Александр Петров',
    },
    isOwn: false,
  },
  {
    id: '2',
    content: 'Привет! Всё хорошо, работаю над проектом. А у тебя?',
    timestamp: '10:47',
    sender: {
      id: 'current-user',
      name: 'Я',
    },
    isOwn: true,
  },
  {
    id: '3',
    content: 'Тоже неплохо. Хотел уточнить детали по последнему заданию.',
    timestamp: '10:49',
    sender: {
      id: '1',
      name: 'Александр Петров',
    },
    isOwn: false,
  },
  {
    id: '4',
    content: 'Да, конечно! Что именно интересует?',
    timestamp: '10:50',
    sender: {
      id: 'current-user',
      name: 'Я',
    },
    isOwn: true,
  },
];

const MessengerUI = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(demoChats[0]);
  const [messages, setMessages] = useState<Message[]>(demoMessages);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: {
        id: 'current-user',
        name: 'Я',
      },
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-full rounded-lg border">
      <div className="w-80 border-r">
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
