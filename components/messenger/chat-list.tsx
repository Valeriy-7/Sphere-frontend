'use client';

import { Search } from 'lucide-react';
import ChatItem from './chat-item';
import { useState } from 'react';
import { ChatsFindAllQueryResponseType } from '@/kubb-gen';

interface ChatListProps {
  chats: ChatsFindAllQueryResponseType['items'];
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatList = ({ chats, selectedChat, onSelectChat }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="divide-y divide-muted/20">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat === chat.id}
              onClick={() => onSelectChat(chat.id)}
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
