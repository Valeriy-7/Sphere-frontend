import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  isOnline: boolean;
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

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-secondary/50',
        isSelected && 'bg-secondary',
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Чат с ${chat.name}`}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={chat.avatar} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {chat.isOnline && (
          <span className="right absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-sm font-medium">{chat.name}</h3>
          <span className="text-sx text-muted-foreground">{chat.time}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="truncate text-xs text-muted-foreground">{chat.lastMessage}</p>
          {chat.unread > 0 && (
            <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
