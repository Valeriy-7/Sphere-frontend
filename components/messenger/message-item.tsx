import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { CheckCheck } from 'lucide-react';
import { ReactNode } from 'react';

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
  highlightText?: (text: string) => string | ReactNode[];
}

const MessageItem = ({ message, highlightText }: MessageItemProps) => {
  const isSystemMessage = message.sender.id === 'system';

  return (
    <div
      className={cn(
        'mb-4 flex gap-3',
        message.isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto',
        isSystemMessage && 'mx-auto w-full flex-col',
      )}
      data-message-id={message.id}
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
              ? 'rounded-tr-none bg-purple-600 text-white dark:bg-purple-800'
              : isSystemMessage
                ? 'border border-muted/10 bg-muted/30 dark:bg-muted/50'
                : 'rounded-tl-none border border-muted/20 bg-background',
            message.isSystemEvent && 'border border-muted/20 bg-muted/30 dark:bg-muted/50',
          )}
        >
          <p className="text-sm">
            {highlightText ? highlightText(message.content) : message.content}
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{message.timestamp}</span>

          {message.isOwn && (
            <span
              className={cn(
                'ml-1',
                message.isRead ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground',
              )}
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
