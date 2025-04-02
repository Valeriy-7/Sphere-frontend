import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, PaperclipIcon, ChevronDown } from 'lucide-react';
import MessageItem from './message-item';
import MessageInput from './message-input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

interface MessageAreaProps {
  chat: Chat;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

// Компонент для отображения событий в шапке
const EventHeader = ({ content }: { content: string }) => {
  return (
    <div className="mb-2 rounded-lg bg-secondary/50 p-2 text-sm">
      <div className="font-medium">{content}</div>
    </div>
  );
};

const MessageArea = ({ chat, messages, onSendMessage }: MessageAreaProps) => {
  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-muted/20">
            <AvatarImage src={chat.avatar} />
            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{chat.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chat.isOnline ? 'В сети' : 'Не в сети'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Другие опции">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Инфополоса события */}
      <EventHeader content="Событие № 2. Поставка на ФФ № 3 / 01.09.24 / 2 000 ед" />

      <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-4">
        {messages.map((message, index) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>

      <div className="border-t p-3">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default MessageArea;
