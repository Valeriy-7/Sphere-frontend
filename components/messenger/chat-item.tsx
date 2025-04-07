import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';

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

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatItem = ({ chat, isSelected, onClick }: ChatItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  // Определяем цвет аватара для сервисных чатов
  const getAvatarColor = () => {
    if (chat.type === 'service') {
      return 'bg-purple-100 dark:bg-purple-900/30';
    }
    return '';
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
      aria-label={`Чат с ${chat.name}`}
    >
      <div className="relative">
        <Avatar className={cn('h-10 w-10 rounded-full border border-muted/20', getAvatarColor())}>
          <AvatarImage src={chat.avatar} className="rounded-full" />
          <AvatarFallback className="rounded-full">
            {chat.name.split(' ')[0].charAt(0)}
          </AvatarFallback>
        </Avatar>
        {chat.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-sm font-medium">{chat.name}</h3>
          <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">{chat.time}</span>
        </div>
        <div className="mt-1 flex items-center justify-end">
          {chat.unread > 0 ? (
            <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs text-primary-foreground dark:bg-purple-800">
              {chat.unread}
            </span>
          ) : (
            <span className="text-purple-600 dark:text-purple-400">
              <CheckCheck size={14} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
