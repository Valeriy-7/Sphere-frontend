'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Smile, Send, Mic } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Прикрепить файл">
        <Paperclip className="h-5 w-5" />
      </Button>
      <div className="relative flex-1">
        <Input
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full rounded-full"
          aria-label="Эмодзи"
        >
          <Smile className="h-5 w-5" />
        </Button>
      </div>
      {message.trim() ? (
        <Button
          size="icon"
          className="rounded-full"
          onClick={handleSend}
          aria-label="Отправить сообщение"
        >
          <Send className="h-5 w-5" />
        </Button>
      ) : (
        <Button size="icon" className="rounded-full" aria-label="Голосовое сообщение">
          <Mic className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default MessageInput;
