'use client';

import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import ChatItem from './chat-item';
import { useState } from 'react';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  isOnline: boolean;
};

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

const ChatList = ({ chats, selectedChat, onSelectChat }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск чатов..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => onSelectChat(chat)}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">Чаты не найдены</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
