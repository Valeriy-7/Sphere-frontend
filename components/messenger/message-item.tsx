import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div
      className={cn(
        'flex max-w-[80%] gap-3',
        message.isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto',
      )}
    >
      {!message.isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div>
        <div
          className={cn(
            'rounded-lg p-3',
            message.isOwn
              ? 'rounded-tr-none bg-primary text-primary-foreground'
              : 'rounded-tl-none bg-secondary',
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="mt-1 block text-xs text-muted-foreground">{message.timestamp}</span>
      </div>
    </div>
  );
};

export default MessageItem;
