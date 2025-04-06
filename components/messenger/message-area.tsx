import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Info, User, Calendar, Package, Building, Mail, Phone } from 'lucide-react';
import MessageItem from './message-item';
import MessageInput from './message-input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

// Демо-данные кабинета для отображения
const demoCabinetData = {
  id: '123456',
  companyName: 'ООО "Сфера"',
  legalCompanyName: 'Общество с ограниченной ответственностью "Сфера"',
  inn: '7712345678',
  managerFullName: 'Иванов Иван Иванович',
  companyPhone: '+7 (999) 123-45-67',
  companyEmail: 'info@sphere.ru',
  type: 'fulfillment',
};

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
  isSystemEvent?: boolean;
};

interface MessageAreaProps {
  chat: Chat;
  messages: Message[];
  onSendMessage: (content: string) => void;
  eventTitle?: string;
}

const MessageArea = ({ chat, messages, onSendMessage, eventTitle }: MessageAreaProps) => {
  const [showChatInfo, setShowChatInfo] = useState(false);

  // Определяем цвет аватара для сервисных чатов
  const getAvatarColor = () => {
    if (chat.type === 'service') {
      return 'bg-purple-100';
    }
    return '';
  };

  // Определяем тип кабинета текстом
  const getCabinetTypeText = (type: string): string => {
    switch (type) {
      case 'fulfillment':
        return 'Фулфилмент';
      case 'wildberries':
        return 'Wildberries';
      default:
        return 'Не указан';
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-3">
        <div className="flex items-center gap-3">
          <Avatar className={`h-10 w-10 rounded-full border border-muted/20 ${getAvatarColor()}`}>
            <AvatarImage src={chat.avatar} className="rounded-full" />
            <AvatarFallback className="rounded-full">
              {chat.name.split(' ')[0].charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-medium">{chat.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chat.isOnline ? 'В сети' : 'Не в сети'}
            </p>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
              <MoreVertical className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setShowChatInfo(true)}
              >
                <Info className="mr-2 h-4 w-4" />
                Информация о чате
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>

      <div className="border-t p-3">
        <MessageInput onSendMessage={onSendMessage} />
      </div>

      {/* Диалог с информацией о чате */}
      <Dialog open={showChatInfo} onOpenChange={setShowChatInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Информация о чате</DialogTitle>
            <DialogDescription>Детальная информация о компании и контактном лице</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-6 flex items-center gap-4">
              <Avatar
                className={`h-16 w-16 rounded-full border border-muted/20 ${getAvatarColor()}`}
              >
                <AvatarImage src={chat.avatar} className="rounded-full" />
                <AvatarFallback className="rounded-full text-lg">
                  {chat.name.split(' ')[0].charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{demoCabinetData.companyName}</h3>
                <p className="text-sm text-muted-foreground">
                  {getCabinetTypeText(demoCabinetData.type)}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Юридическое название</div>
                  <div className="text-sm text-muted-foreground">
                    {demoCabinetData.legalCompanyName}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    ИНН: {demoCabinetData.inn}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Контактное лицо</div>
                  <div className="text-sm text-muted-foreground">
                    {demoCabinetData.managerFullName}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Телефон</div>
                  <div className="text-sm text-muted-foreground">
                    {demoCabinetData.companyPhone}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">
                    {demoCabinetData.companyEmail}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Дата создания чата</div>
                  <div className="text-sm text-muted-foreground">10.09.2024</div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button variant="ghost" className="w-full">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageArea;
