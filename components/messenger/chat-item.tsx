import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';
import { ChatsFindAllQueryResponseType } from '@/kubb-gen';
import { useWebSocket } from './websocket-context';

type Chat = ChatsFindAllQueryResponseType['items'][0];

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatItem = ({ chat, isSelected, onClick }: ChatItemProps) => {
  const { onlineUsers, typingUsers, lastSeenTimes } = useWebSocket();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  const getAvatarFallback = () => {
    return chat.partner.companyName.charAt(0).toUpperCase();
  };

  const formatTime = (date: string | Date) => {
    const now = new Date();
    const messageDate = new Date(date);

    // If it's today, show time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    // If it's yesterday, show "Вчера"
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    }

    // Otherwise show date
    return messageDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-3 border-b border-muted/20 p-3 transition-colors hover:bg-muted/30',
        isSelected && 'bg-muted/20 shadow-sm',
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Чат с ${chat.partner.companyName}`}
    >
      <div className="relative">
        <Avatar className="h-10 w-10 rounded-full border border-muted/20">
          <AvatarImage src={chat.partner.avatarUrl || undefined} className="rounded-full" />
          <AvatarFallback className="rounded-full">{getAvatarFallback()}</AvatarFallback>
        </Avatar>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-sm font-medium">{chat.partner.companyName}</h3>
          <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">
            {formatTime(chat.lastMessageDate)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="truncate text-sm text-muted-foreground">{chat.lastMessage}</p>
          {chat.unreadCount > 0 && (
            <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs text-primary-foreground dark:bg-purple-800">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
