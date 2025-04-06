'use client';

import { useState, useRef, useEffect } from 'react';
import ChatList from './chat-list';
import MessageArea from './message-area';
import { User, Search, GripVertical } from 'lucide-react';
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
  isSystemEvent?: boolean;
};

interface ResizeHandleProps {
  onResize: (position: number) => void;
  isVertical?: boolean;
}

const demoChats: Chat[] = [
  {
    id: '1',
    name: 'adidas Александр',
    lastMessage: 'Добрый день! Ожидаем поставку!',
    time: '14:11',
    unread: 0,
    isOnline: true,
    type: 'user',
    avatar: '/messenger/adidas-avatar.png',
  },
  {
    id: '2',
    name: 'Игрушки Виктория',
    lastMessage: 'Товар принят на Фулфилмент',
    time: '10:31',
    unread: 2,
    isOnline: false,
    type: 'user',
    avatar: '/messenger/toys-avatar.png',
  },
  {
    id: '3',
    name: 'ФФ Коробка Полина',
    lastMessage: 'Отличная новость!',
    time: 'Вчера',
    unread: 0,
    isOnline: true,
    type: 'service',
    avatar: '/messenger/ff-avatar.png',
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
      avatar: '/messenger/adidas-avatar.png',
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
    isSystemEvent: true,
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
    isSystemEvent: true,
  },
];

// Демо-события для фильтрации
const demoEvents = [
  {
    id: '1',
    title: 'Событие № 1 Поставка на ФФ № 1 / 10.09.2024 / 1500 ед',
    date: '10.09.2024',
    type: 'ff',
  },
  {
    id: '2',
    title: 'Событие № 2 Поставка на ВБ № 1 / 11.09.2024 / 3000 ед',
    date: '11.09.2024',
    type: 'wb',
  },
  {
    id: '3',
    title: 'Событие № 3 Поставка на ВБ № 2 / 12.09.2024 / 2200 ед',
    date: '12.09.2024',
    type: 'wb',
  },
];

const ResizeHandle = ({ onResize, isVertical = true }: ResizeHandleProps) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onResize(isVertical ? e.clientX : e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handle = handleRef.current;
    if (handle) {
      handle.addEventListener('mousedown', handleMouseDown);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (handle) {
        handle.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onResize, isVertical]);

  return (
    <div
      ref={handleRef}
      className={`group flex ${
        isVertical
          ? 'h-full w-4 cursor-col-resize flex-col'
          : 'h-4 w-full cursor-row-resize flex-row'
      } items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300`}
    >
      <div className="flex items-center justify-center py-3">
        <GripVertical
          className={`h-6 w-6 text-gray-400 group-hover:text-gray-600 ${isVertical ? '' : 'rotate-90'}`}
        />
      </div>
    </div>
  );
};

const MessengerUI = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(demoChats[0]);
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [filterType, setFilterType] = useState<'all' | 'ff' | 'wb'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Размеры панелей
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);
  const [rightPanelWidth, setRightPanelWidth] = useState(256);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date()
        .toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(/(\d+)\.(\d+)\.(\d+), (\d+:\d+)/, '$1.$2.$3 $4'),
      sender: {
        id: 'current-user',
        name: 'Я',
      },
      isOwn: true,
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Обработчики изменения размеров
  const handleLeftPanelResize = (clientX: number) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = clientX - containerRect.left;
      setLeftPanelWidth(Math.max(200, Math.min(newWidth, 400)));
    }
  };

  const handleRightPanelResize = (clientX: number) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const newWidth = containerWidth - (clientX - containerRect.left);
      setRightPanelWidth(Math.max(200, Math.min(newWidth, 400)));
    }
  };

  // Фильтрация событий
  const filteredEvents = demoEvents.filter((event) => {
    if (filterType !== 'all' && event.type !== filterType) {
      return false;
    }

    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div ref={containerRef} className="flex h-full rounded-lg border">
      <div
        style={{ width: `${leftPanelWidth}px` }}
        className="rounded-l-lg border-r bg-white shadow-md"
      >
        <div className="border-b p-3">
          <div className="mb-4 text-lg font-medium">Мессенджер</div>
          <div className="relative mb-4">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск" className="border-muted bg-secondary/80 pl-8 text-sm" />
            </div>
          </div>
        </div>
        <ChatList chats={demoChats} selectedChat={selectedChat} onSelectChat={handleSelectChat} />
      </div>

      <ResizeHandle onResize={handleLeftPanelResize} />

      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <MessageArea
            chat={selectedChat}
            messages={messages}
            onSendMessage={handleSendMessage}
            eventTitle="Событие № 2. Поставка на ФФ № 3 / 01.09.24 / 2 000 ед"
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
            <User size={64} className="mb-4 opacity-30" />
            <p>Выберите чат, чтобы начать общение</p>
          </div>
        )}
      </div>

      <ResizeHandle onResize={handleRightPanelResize} />

      <div style={{ width: `${rightPanelWidth}px` }} className="border-l bg-white p-3 shadow-md">
        <div className="mb-4 text-lg font-medium">Фильтр</div>
        <div className="mb-4 flex flex-col space-y-2">
          <Button
            variant={filterType === 'all' ? 'secondary' : 'ghost'}
            className={`justify-start text-xs shadow-sm ${filterType === 'all' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => setFilterType('all')}
          >
            Все поставки
          </Button>
          <Button
            variant={filterType === 'ff' ? 'secondary' : 'ghost'}
            className={`justify-start text-xs shadow-sm ${filterType === 'ff' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => setFilterType('ff')}
          >
            Поставки на ФФ
          </Button>
          <Button
            variant={filterType === 'wb' ? 'secondary' : 'ghost'}
            className={`justify-start text-xs shadow-sm ${filterType === 'wb' ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => setFilterType('wb')}
          >
            Поставки на ВБ
          </Button>
        </div>
        <div className="relative mb-4">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск событий"
              className="border-muted bg-secondary/80 pl-8 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">События</div>
          {filteredEvents.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              {filteredEvents.map((event) => (
                <div key={event.id} className="mb-2 rounded-md border p-2 text-xs">
                  <div className="font-medium">{event.title}</div>
                  <div className="mt-1 text-muted-foreground">{event.date}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2 text-center text-xs text-muted-foreground">
              Нет событий для отображения
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessengerUI;
