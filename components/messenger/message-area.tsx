import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical } from 'lucide-react';
import MessageItem from './message-item';
import MessageInput from './message-input';
import { Button } from '@/components/ui/button';

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

interface MessageAreaProps {
  chat: Chat;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const MessageArea = ({ chat, messages, onSendMessage }: MessageAreaProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-3">
          <Avatar>
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
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
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
