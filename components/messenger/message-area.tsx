import React, { useState, useRef, useEffect } from 'react';
import MessageInput from './message-input';
import { Button } from '@/components/ui/button';
import { Filter, X, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MessageItem from './message-item';
import { PartnerCabinetDtoType, useMessagesCreate } from '@/kubb-gen';
import { DeliveryFilter } from './types';
import { Input } from '@/components/ui/input';
import { createMessageDtoTypeEnum } from '@/kubb-gen';
import { useQueryClient } from '@tanstack/react-query';
import { messagesFindAllQueryKey } from '@/kubb-gen/hooks/messages/useMessagesFindAll';
import { useToast } from '@/components/ui/use-toast';
import { useUploadAttachment, useUploadVoiceMessage } from '@/lib/utils/file-upload';

export interface MessageAreaProps {
  messages: any[];
  events: any[];
  partner?: PartnerCabinetDtoType;
  onSendMessage: (text: string) => void;
  chatId?: string;
  isLoading?: boolean;
  error?: string | null;
  filterType: DeliveryFilter;
  onFilterChange: (filter: DeliveryFilter) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  filterRef: React.RefObject<HTMLDivElement>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  events,
  partner,
  onSendMessage,
  chatId,
  isLoading = false,
  error = null,
  filterType,
  onFilterChange,
  isFilterOpen,
  setIsFilterOpen,
  filterRef,
  searchTerm,
  setSearchTerm,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Мутации для отправки файлов и сообщений
  const uploadAttachment = useUploadAttachment();
  const uploadVoice = useUploadVoiceMessage();
  const messageMutation = useMessagesCreate();

  // Прокрутка к последнему сообщению при получении новых
  useEffect(() => {
    if (messagesEndRef.current && !isSearching) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSearching]);

  // Обработчик отправки сообщения
  const handleSendMessage = (text: string) => {
    if (text.trim() && chatId) {
      onSendMessage(text.trim());
      setMessage('');
    }
  };

  // Обработчик загрузки файлов
  const handleFileUpload = async (files: File[]) => {
    if (!chatId || files.length === 0) return;

    setIsUploading(true);

    try {
      // Для каждого файла создаем и отправляем файл
      for (const file of files) {
        try {
          const uploadedAttachment = await uploadAttachment.mutateAsync({
            file,
            chatId,
          });

          if (uploadedAttachment?.id) {
            console.log('Файл успешно загружен:', uploadedAttachment);

            // Отправляем сообщение с прикрепленным файлом
            const messageData = {
              chatId: chatId,
              text: `Отправлен файл: ${file.name}`,
              type: createMessageDtoTypeEnum.FILE, // Используем тип FILE для всех файлов
              attachmentIds: [uploadedAttachment.id],
            };

            messageMutation.mutate(
              { data: messageData },
              {
                onSuccess: () => {
                  // Обновляем данные с сервера
                  queryClient.invalidateQueries({
                    queryKey: messagesFindAllQueryKey({
                      chatId: chatId,
                      limit: 100,
                      offset: 0,
                    }),
                  });
                },
                onError: (error) => {
                  console.error('Ошибка при отправке сообщения с файлом:', error);
                  toast({
                    title: 'Ошибка',
                    description: 'Не удалось отправить сообщение с прикрепленным файлом',
                    variant: 'destructive',
                  });
                },
              },
            );
          }
        } catch (error) {
          console.error(`Ошибка при загрузке файла ${file.name}:`, error);
          toast({
            title: 'Ошибка',
            description: `Не удалось загрузить файл ${file.name}`,
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('Общая ошибка при обработке файлов:', error);
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при обработке файлов',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Обработчик записи голосовых сообщений
  const handleVoiceRecord = async (blob: Blob, durationSeconds: number) => {
    if (!chatId) return;

    setIsUploading(true);
    console.log('Отправка голосового сообщения:', {
      chatId,
      blobType: blob.type,
      blobSize: blob.size,
      duration: durationSeconds,
    });

    try {
      // Используем переданную длительность записи
      const duration = durationSeconds;

      try {
        // Загружаем голосовое сообщение
        console.log('Загрузка аудио на сервер...');
        const uploadedAttachment = await uploadVoice.mutateAsync({
          blob,
          chatId,
          duration,
        });

        console.log('Результат загрузки голосового сообщения:', uploadedAttachment);

        // Проверка наличия данных вложения
        const attachmentId =
          uploadedAttachment?.id ||
          (uploadedAttachment?.attachment && uploadedAttachment.attachment.id);

        if (attachmentId) {
          console.log('Голосовое сообщение успешно загружено с ID:', attachmentId);

          // Проверяем URL файла и сохраняем его
          const attachmentUrl =
            uploadedAttachment?.fileUrl ||
            uploadedAttachment?.url ||
            (uploadedAttachment?.attachment &&
              (uploadedAttachment.attachment.fileUrl || uploadedAttachment.attachment.url));

          if (!attachmentUrl) {
            console.warn('Внимание: Загруженное вложение не содержит URL:', uploadedAttachment);
          } else {
            console.log('URL голосового сообщения:', attachmentUrl);
          }

          // Отправляем сообщение с голосовым файлом
          const messageData = {
            chatId: chatId,
            text: 'Голосовое сообщение',
            type: createMessageDtoTypeEnum.VOICE,
            attachmentIds: [attachmentId],
            voiceUrl: attachmentUrl, // Добавляем URL напрямую для избежания проблем
          };

          console.log('Отправка сообщения с голосовым вложением:', messageData);

          messageMutation.mutate(
            { data: messageData },
            {
              onSuccess: (response) => {
                console.log('Сообщение успешно отправлено:', response);

                // Для оптимистичного обновления добавим URL вручную
                if (response) {
                  try {
                    // Проверяем наличие voiceUrl в ответе
                    if (!response.voiceUrl && attachmentUrl) {
                      console.log('Добавляем voiceUrl в ответ сервера для отображения');
                      // @ts-ignore - Игнорируем ошибку типа
                      response.voiceUrl = attachmentUrl;
                    }

                    // То же для поля url если нет
                    if (!response.url && attachmentUrl) {
                      console.log('Добавляем url в ответ сервера для отображения');
                      // @ts-ignore - Игнорируем ошибку типа
                      response.url = attachmentUrl;
                    }
                  } catch (err) {
                    console.error('Ошибка при добавлении URL в ответ:', err);
                  }
                }

                // Обновляем данные с сервера
                queryClient.invalidateQueries({
                  queryKey: messagesFindAllQueryKey({
                    chatId: chatId,
                    limit: 100,
                    offset: 0,
                  }),
                });
              },
              onError: (error) => {
                console.error('Ошибка при отправке голосового сообщения:', error);
                toast({
                  title: 'Ошибка',
                  description: 'Не удалось отправить голосовое сообщение',
                  variant: 'destructive',
                });
              },
            },
          );
        } else {
          console.error('Ошибка: Не получен ID загруженного вложения', uploadedAttachment);
          toast({
            title: 'Ошибка',
            description: 'Не удалось загрузить голосовое сообщение (отсутствует ID)',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Ошибка при загрузке голосового сообщения:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить голосовое сообщение',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Общая ошибка при обработке голосового сообщения:', error);
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при обработке голосового сообщения',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Переворачиваем порядок сообщений, чтобы новые были внизу
  const sortedMessages = [...messages].reverse();

  // Фильтрация сообщений по поисковому запросу
  const filteredMessages = messageSearchTerm
    ? sortedMessages.filter(
        (msg) => msg.text && msg.text.toLowerCase().includes(messageSearchTerm.toLowerCase()),
      )
    : sortedMessages;

  return (
    <div className="flex h-full max-h-full w-full flex-col overflow-hidden">
      {/* Заголовок с информацией о партнере */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-card/50 p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={partner?.avatarUrl || ''} alt={partner?.companyName || 'Аватар'} />
            <AvatarFallback>
              {partner?.companyName?.substring(0, 2).toUpperCase() || 'ПК'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{partner?.companyName || 'Выберите партнера'}</h3>
          </div>
        </div>

        <div className="flex items-center">
          {isSearching ? (
            <div className="flex w-64 items-center rounded-md border bg-background pr-1">
              <Input
                type="search"
                placeholder="Поиск в сообщениях..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={messageSearchTerm}
                onChange={(e) => setMessageSearchTerm(e.target.value)}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setIsSearching(false);
                  setMessageSearchTerm('');
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearching(true)}
              className="h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Область сообщений */}
      <div className="min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-center text-destructive">
              {error}
            </div>
          </div>
        ) : filteredMessages.length > 0 ? (
          <div className="w-full space-y-4">
            {filteredMessages.map((msg, index) => {
              // Проверяем, является ли текущий пользователь отправителем сообщения
              // если partner?.id не совпадает с msg.senderId, то сообщение наше
              const isOwn = msg.senderId !== partner?.id;

              // Создаем новый объект сообщения с добавленным полем isOwn
              const messageWithOwn = {
                ...msg,
                isOwn,
                // Добавляем senderCabinet, если сообщение от партнера
                senderCabinet: !isOwn && partner ? partner : msg.senderCabinet,
              };

              return <MessageItem key={msg.id || index} message={messageWithOwn} />;
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-muted-foreground">
            <p>
              {messageSearchTerm
                ? 'Нет сообщений, соответствующих поисковому запросу'
                : 'Начните общение с партнером'}
            </p>
          </div>
        )}
      </div>

      {/* Ввод сообщения */}
      <div className="w-full shrink-0 border-t border-border bg-card/50 p-3">
        <MessageInput
          value={message}
          onChange={(val) => setMessage(val)}
          onSend={handleSendMessage}
          onFileUpload={handleFileUpload}
          onVoiceRecord={handleVoiceRecord}
          placeholder="Введите сообщение..."
          disabled={isLoading || !!error || isUploading}
        />
        {isUploading && (
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="h-3 w-3 animate-spin rounded-full border-b border-t border-primary"></div>
            <span>Загрузка файла...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageArea;
