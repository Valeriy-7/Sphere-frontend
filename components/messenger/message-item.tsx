import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { CheckCheck } from 'lucide-react';

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

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isSystemMessage = message.sender.id === 'system';

  return (
    <div
      className={cn(
        'mb-4 flex gap-3',
        message.isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto',
        isSystemMessage && 'mx-auto w-full flex-col',
      )}
    >
      {!message.isOwn && !isSystemMessage && (
        <Avatar className="h-8 w-8 border border-muted/20">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn(isSystemMessage ? 'w-full' : 'max-w-[80%]')}>
        {!isSystemMessage && !message.isOwn && (
          <div className="mb-1 text-xs text-muted-foreground">{message.sender.name}</div>
        )}

        <div
          className={cn(
            'rounded-lg p-3 text-sm',
            message.isOwn
              ? 'rounded-tr-none bg-purple-600 text-white'
              : isSystemMessage
                ? 'border border-muted/10 bg-gray-100'
                : 'rounded-tl-none border border-muted/20 bg-white',
            message.isSystemEvent && 'border border-muted/20 bg-gray-100',
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{message.timestamp}</span>

          {message.isOwn && (
            <span
              className={cn('ml-1', message.isRead ? 'text-purple-600' : 'text-muted-foreground')}
            >
              <CheckCheck size={14} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
