'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import MessageArea from './message-area';
import { User, Search, GripVertical, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useChatsFindAll,
  useMessagesCreate,
  useMessagesFindAll,
  useMessagesFindEvents,
  useCabinetsGetPartners,
  useChatsCreate,
  ChatsFindAllQueryResponseType,
  MessagesFindAllQueryResponseType,
  CreateMessageDtoTypeEnumType,
  createMessageDtoTypeEnum,
  PartnerCabinetDtoType,
} from '@/kubb-gen';
import { messagesFindEventsQueryKey } from '@/kubb-gen/hooks/messages/useMessagesFindEvents';
import { messagesFindAllQueryKey } from '@/kubb-gen/hooks/messages/useMessagesFindAll';
import { useQueryClient } from '@tanstack/react-query';
import PartnerChatItem from './partner-chat-item';
import { useToast } from '@/components/ui/use-toast';
import { useWebSocket } from './websocket-context';
import { DeliveryFilter } from './types';
import { WebSocketEvent } from './types';

// Компонент для изменения размера панелей
interface ResizeHandleProps {
  onResize: (clientX: number) => void;
  isVertical?: boolean;
  minSize?: number;
  maxSize?: number;
}

const ResizeHandle = ({
  onResize,
  isVertical = false,
  minSize = 180,
  maxSize = 500,
}: ResizeHandleProps) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      document.body.style.cursor = isVertical ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none'; // Предотвращает выделение текста во время перетаскивания
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        onResize(isVertical ? e.clientX : e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    const handle = handleRef.current;
    if (handle) {
      handle.addEventListener('mousedown', handleMouseDown);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (handle) {
        handle.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, onResize, isVertical]);

  return (
    <div
      ref={handleRef}
      className={`group flex touch-none ${
        isVertical
          ? 'h-full w-2 cursor-col-resize items-center justify-center'
          : 'h-2 w-full cursor-row-resize items-center justify-center'
      } transition-colors ${isDragging ? 'bg-primary/30' : 'hover:bg-muted/70'}`}
      title="Изменить размер"
    >
      {isVertical && (
        <div className="flex h-24 w-full items-center justify-center">
          <img
            src="/messenger-ui/drag-handle.svg"
            alt="resize"
            className="h-6 w-6 opacity-40 group-hover:opacity-60"
          />
        </div>
      )}
    </div>
  );
};

const MessengerUI = () => {
  const { toast } = useToast();
  const { socket, isConnected, joinChat, leaveChat } = useWebSocket();
  const queryClient = useQueryClient();

  // Основное состояние компонента
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [actualChatId, setActualChatId] = useState<string | null>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);
  const [rightPanelWidth, setRightPanelWidth] = useState(256);
  const [filterType, setFilterType] = useState<DeliveryFilter>(DeliveryFilter.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatSearchTerm, setChatSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  // Очищаем локальное хранилище при инициализации
  useEffect(() => {
    try {
      localStorage.removeItem('lastChatId');
      console.log('Очищен localStorage от lastChatId при инициализации');
    } catch (error) {
      console.error('Ошибка при очистке localStorage:', error);
    }
  }, []);

  // Обработка WebSocket событий для автоматического обновления чатов
  useEffect(() => {
    if (socket && isConnected) {
      const handleNewMessage = (data: any) => {
        console.log('MessengerUI: получено новое сообщение через WebSocket:', data);

        // Определяем тип сообщения для отладки
        const messageType = data.message?.type || 'unknown';
        console.log(`Тип полученного сообщения: ${messageType}, чат: ${data.chatId}`);

        // Дополнительная обработка для голосовых сообщений
        if (messageType === 'VOICE') {
          console.log('Получено голосовое сообщение:', data.message);

          // Проверяем наличие URL для аудио
          if (!data.message.voiceUrl && data.message.attachments?.length > 0) {
            const attachment = data.message.attachments[0];
            if (attachment && (attachment.fileUrl || attachment.url)) {
              console.log('Автоматически добавлен voiceUrl из attachment');
              data.message.voiceUrl = attachment.fileUrl || attachment.url;
            }
          }

          // Если все еще нет URL, но есть ID сообщения, создаем предполагаемый URL
          if (!data.message.voiceUrl && data.message.id) {
            console.log('Создаем URL для голосового сообщения на основе ID');
            data.message.voiceUrl = `/api/attachments/voice/${data.message.id}.mp3`;
            console.log('Создан URL:', data.message.voiceUrl);

            // Также добавляем временный флаг для отладки
            data.message._createdVoiceUrl = true;
          }

          // Дополнительно проверяем наличие attachment в сообщении
          if (data.message.attachment) {
            console.log('Сообщение содержит объект attachment:', data.message.attachment);

            if (
              !data.message.voiceUrl &&
              (data.message.attachment.fileUrl || data.message.attachment.url)
            ) {
              console.log('Используем URL из объекта attachment');
              data.message.voiceUrl =
                data.message.attachment.fileUrl || data.message.attachment.url;
            }
          }

          // Если URL все еще не найден, добавляем информацию об этом
          if (!data.message.voiceUrl) {
            console.warn('Внимание: не удалось найти URL для голосового сообщения:', data.message);
          } else {
            console.log('Финальный URL для голосового сообщения:', data.message.voiceUrl);
          }
        }

        // Автоматически обновляем список чатов
        queryClient.invalidateQueries({ queryKey: ['chats'] });

        // Если сообщение относится к текущему открытому чату, обновляем и его
        if (data.chatId === actualChatId && actualChatId !== null) {
          console.log(`Обновляем текущий открытый чат ${actualChatId}`);
          queryClient.invalidateQueries({
            queryKey: messagesFindAllQueryKey({
              chatId: actualChatId,
              limit: 100,
              offset: 0,
            }),
          });
        } else {
          console.log(
            `Получено сообщение для другого чата: ${data.chatId}, текущий: ${actualChatId}`,
          );
        }
      };

      // Подписываемся на события
      socket.on(WebSocketEvent.MESSAGE, handleNewMessage);

      // Отписываемся при размонтировании
      return () => {
        socket.off(WebSocketEvent.MESSAGE, handleNewMessage);
      };
    }
  }, [socket, isConnected, queryClient, actualChatId]);

  // Получаем список партнерских кабинетов
  const { data: partnersData } = useCabinetsGetPartners(
    {
      limit: 50,
      page: 1,
      search: chatSearchTerm,
    },
    {
      query: {
        // Обновляем список каждые 15 секунд
        refetchInterval: 15000,
        // Обновляем список при фокусе на окне
        refetchOnWindowFocus: true,
      },
    },
  );

  // Получаем список партнеров
  const partners = partnersData?.items || [];

  // Мутация для создания чата
  const chatMutation = useChatsCreate();

  // Получаем сообщения для выбранного чата
  const { data: messagesData, isLoading: isLoadingMessages } = useMessagesFindAll(
    {
      chatId: actualChatId || '',
      limit: 100,
      offset: 0,
    },
    {
      query: {
        enabled: !!actualChatId && actualChatId.length > 0,
        staleTime: 0,
        refetchOnWindowFocus: true,
      },
    },
  );

  // Получаем события для выбранного чата
  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    error: eventsQueryError,
  } = useMessagesFindEvents(
    {
      chatId: actualChatId || '',
      filter: filterType,
      limit: 100,
      offset: 0,
      search: searchTerm || undefined,
    },
    {
      query: {
        // Полностью отключаем запрос событий, пока бэкенд не будет исправлен
        enabled: false, // Временно отключаем, чтобы устранить ошибки
        staleTime: 0,
        refetchOnWindowFocus: false,
        retry: 0, // Отключаем повторные попытки
      },
    },
  );

  // Мутация для отправки сообщений
  const messageMutation = useMessagesCreate();

  // Подключаемся к комнате чата при его выборе
  useEffect(() => {
    if (actualChatId && isConnected) {
      try {
        joinChat(actualChatId);
      } catch (error) {
        console.error('Ошибка при подключении к комнате чата:', error);
      }

      // Отписываемся от комнаты при размонтировании
      return () => {
        try {
          leaveChat(actualChatId);
        } catch (error) {
          console.error('Ошибка при отключении от комнаты чата:', error);
        }
      };
    }
  }, [actualChatId, isConnected, joinChat, leaveChat]);

  // Обработчик отправки сообщения
  const handleSendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || !actualChatId) {
        toast({
          title: 'Ошибка',
          description: 'Введите текст сообщения',
          variant: 'destructive',
        });
        return;
      }

      // Проверка на валидный UUID
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(actualChatId)) {
        toast({
          title: 'Ошибка',
          description: 'Некорректный идентификатор чата',
          variant: 'destructive',
        });
        return;
      }

      console.log('Отправка сообщения:', content, 'в чат:', actualChatId);

      // Создаем оптимистичную версию сообщения для мгновенного отображения
      const currentDate = new Date().toISOString();
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        text: content,
        createdAt: currentDate,
        senderId: 'current-user', // Будет заменено реальным ID после успешной отправки
        isOwn: true,
        isRead: false,
        type: 'TEXT',
        chat: { id: actualChatId },
        sender: { name: 'Вы' },
        senderCabinet: { companyName: 'Вы' },
        updatedAt: currentDate,
      };

      // Оптимистично обновляем UI
      queryClient.setQueryData(
        messagesFindAllQueryKey({
          chatId: actualChatId,
          limit: 100,
          offset: 0,
        }),
        (oldData: any) => {
          // Если данных нет, создаем структуру
          if (!oldData) {
            return { items: [optimisticMessage], total: 1 };
          }

          // Иначе добавляем сообщение к существующим
          return {
            ...oldData,
            items: [...(oldData.items || []), optimisticMessage],
            total: (oldData.total || 0) + 1,
          };
        },
      );

      try {
        messageMutation.mutate(
          {
            data: {
              chatId: actualChatId,
              text: content,
              type: createMessageDtoTypeEnum.TEXT,
            },
          },
          {
            onSuccess: (data) => {
              console.log('Сообщение успешно отправлено:', data);

              // Обновляем данные с сервера
              try {
                queryClient.invalidateQueries({
                  queryKey: messagesFindAllQueryKey({
                    chatId: actualChatId,
                    limit: 100,
                    offset: 0,
                  }),
                });

                // Обновляем список чатов
                queryClient.invalidateQueries({
                  queryKey: [{ url: '/chats' }],
                });
              } catch (error) {
                console.error('Ошибка при обновлении данных после отправки:', error);
              }
            },
            onError: (error) => {
              console.error('Ошибка при отправке сообщения:', error);

              // В случае ошибки удаляем оптимистичное сообщение
              queryClient.setQueryData(
                messagesFindAllQueryKey({
                  chatId: actualChatId,
                  limit: 100,
                  offset: 0,
                }),
                (oldData: any) => {
                  if (!oldData || !oldData.items) return oldData;

                  return {
                    ...oldData,
                    items: oldData.items.filter((msg: any) => msg.id !== optimisticMessage.id),
                    total: Math.max(0, (oldData.total || 0) - 1),
                  };
                },
              );

              toast({
                title: 'Ошибка',
                description: 'Не удалось отправить сообщение',
                variant: 'destructive',
              });
            },
          },
        );
      } catch (error) {
        console.error('Критическая ошибка при отправке сообщения:', error);

        // Удаляем оптимистичное сообщение при критической ошибке
        queryClient.setQueryData(
          messagesFindAllQueryKey({
            chatId: actualChatId,
            limit: 100,
            offset: 0,
          }),
          (oldData: any) => {
            if (!oldData || !oldData.items) return oldData;

            return {
              ...oldData,
              items: oldData.items.filter((msg: any) => msg.id !== optimisticMessage.id),
              total: Math.max(0, (oldData.total || 0) - 1),
            };
          },
        );

        toast({
          title: 'Ошибка',
          description: 'Не удалось отправить сообщение из-за внутренней ошибки',
          variant: 'destructive',
        });
      }
    },
    [actualChatId, messageMutation, queryClient, toast],
  );

  // Обработчик выбора чата
  const handleSelectChat = useCallback(
    (chatId: string) => {
      if (!chatId) return;

      // Валидация ID
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(chatId)) {
        toast({
          title: 'Ошибка',
          description: 'Некорректный идентификатор партнера',
          variant: 'destructive',
        });
        return;
      }

      // Очищаем ошибки
      setChatError(null);
      setEventsError(null);

      // Устанавливаем выбранный партнер
      setSelectedChat(chatId);
      setIsLoadingChat(true);

      // Создаем или получаем чат для выбранного партнера
      console.log('Создание/получение чата для партнера:', chatId);

      chatMutation.mutate(
        {
          data: {
            partnerId: chatId,
          },
        },
        {
          onSuccess: (chatData) => {
            setIsLoadingChat(false);

            if (chatData && chatData.id) {
              console.log('Получен ID чата:', chatData.id);
              setActualChatId(chatData.id);
            } else {
              console.error('Получен невалидный ответ от сервера:', chatData);
              toast({
                title: 'Ошибка',
                description: 'Не удалось получить данные чата',
                variant: 'destructive',
              });
              setActualChatId(null);
            }
          },
          onError: (error) => {
            setIsLoadingChat(false);
            console.error('Ошибка при создании/получении чата:', error);
            toast({
              title: 'Ошибка',
              description: 'Не удалось создать или получить чат',
              variant: 'destructive',
            });
            setActualChatId(null);
            setSelectedChat(null); // Сбрасываем выбранный чат при ошибке
          },
        },
      );
    },
    [chatMutation, toast],
  );

  // Получаем данные для выбранного партнера
  const selectedPartner = partners.find((partner) => partner.id === selectedChat);

  // Фильтрованные события (пустой массив, пока не исправлен бэкенд)
  const filteredEvents: any[] = []; // Временное решение

  // Обновляем фильтр
  const handleFilterChange = (newFilter: DeliveryFilter) => {
    setFilterType(newFilter);
    setIsFilterOpen(false);
  };

  // Обработчики изменения размера панелей
  const handleLeftPanelResize = (clientX: number) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const minWidth = 200;
    const maxWidth = Math.min(500, containerRect.width * 0.4);
    const newWidth = Math.max(minWidth, Math.min(maxWidth, clientX - containerRect.left));

    setLeftPanelWidth(newWidth);
  };

  const handleRightPanelResize = (clientX: number) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const minWidth = 200;
    const maxWidth = containerRect.width * 0.4;

    // Вычисляем новую ширину от правого края контейнера
    const distanceFromRight = containerRect.right - clientX;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, distanceFromRight));

    setRightPanelWidth(newWidth);
  };

  // Обработчик клика вне фильтра
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Обработка ошибок
  useEffect(() => {
    if (chatError) {
      toast({
        title: 'Ошибка чата',
        description: chatError,
        variant: 'destructive',
      });
    }

    if (eventsError) {
      toast({
        title: 'Ошибка событий',
        description: eventsError,
        variant: 'destructive',
      });
    }
  }, [chatError, eventsError, toast]);

  // Обработчик ошибок API
  useEffect(() => {
    // Обрабатываем ошибки запроса событий (временно отключено)
    /*
    if (eventsQueryError) {
      console.error('Ошибка при получении событий:', eventsQueryError);

      // Проверяем, что ошибка не уже установлена (чтобы избежать циклических обновлений)
      if (!eventsError) {
        setEventsError('Не удалось загрузить события для этого чата');
      }
    } else if (actualChatId && eventsError) {
      // Сбрасываем ошибки только если запрос успешный и ошибка была установлена
      setEventsError(null);
    }
    */
    // Временно сбрасываем ошибки событий до исправления бэкенда
    setEventsError(null);
  }, [actualChatId, eventsQueryError, eventsError]);

  // Дополнительный эффект для очистки ошибок при смене чата
  useEffect(() => {
    // Когда чат меняется, сбрасываем ошибки
    setEventsError(null);
    setChatError(null);
  }, [selectedChat]);

  return (
    <div
      className="flex h-full max-h-full w-full gap-1 overflow-hidden rounded-lg border border-border bg-background shadow-sm"
      ref={containerRef}
    >
      {/* Левая панель - список партнеров */}
      <div
        className="flex h-full flex-col rounded-l-lg bg-card/50 p-1"
        style={{ width: `${leftPanelWidth}px` }}
      >
        <div className="shrink-0 p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск партнера..."
              className="pl-8"
              value={chatSearchTerm}
              onChange={(e) => setChatSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-1">
          <div className="space-y-1">
            {partners.map((partner) => (
              <PartnerChatItem
                key={partner.id}
                partner={partner}
                isSelected={selectedChat === partner.id}
                onClick={() => handleSelectChat(partner.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <ResizeHandle onResize={handleLeftPanelResize} isVertical minSize={200} maxSize={500} />

      {/* Центральная панель - сообщения */}
      <div className="flex h-full w-full flex-1 overflow-hidden rounded-md bg-card/30">
        {selectedChat ? (
          <MessageArea
            messages={messagesData?.items || []}
            events={filteredEvents}
            partner={selectedPartner}
            onSendMessage={handleSendMessage}
            chatId={actualChatId || undefined}
            isLoading={isLoadingMessages || isLoadingChat}
            error={chatError}
            filterType={filterType}
            onFilterChange={handleFilterChange}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            filterRef={filterRef}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <User className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Выберите партнера</h2>
            <p className="max-w-md text-muted-foreground">
              Выберите партнера из списка слева, чтобы начать общение. Вы также можете
              воспользоваться поиском для быстрого нахождения нужного партнера.
            </p>
          </div>
        )}
      </div>

      {/* Разделитель */}
      <ResizeHandle onResize={handleRightPanelResize} isVertical minSize={200} maxSize={400} />

      {/* Правая панель - события */}
      <div
        className="flex h-full flex-col rounded-r-lg bg-card/50 p-1"
        style={{ width: `${rightPanelWidth}px` }}
      >
        <div className="shrink-0 p-3">
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск событий..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full justify-between"
              size="sm"
            >
              {filterType === DeliveryFilter.ALL
                ? 'Все поставки'
                : filterType === DeliveryFilter.FF
                  ? 'Поставки на ФФ'
                  : 'Поставки на ВБ'}
              <Filter className="ml-2 h-4 w-4" />
            </Button>

            {isFilterOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-border bg-background shadow-md">
                <div className="p-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleFilterChange(DeliveryFilter.ALL)}
                  >
                    Все поставки
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleFilterChange(DeliveryFilter.FF)}
                  >
                    Поставки на ФФ
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleFilterChange(DeliveryFilter.WB)}
                  >
                    Поставки на ВБ
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {isLoadingEvents ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">
                Функциональность просмотра событий временно недоступна.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Мы работаем над исправлением и скоро всё заработает!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessengerUI;
