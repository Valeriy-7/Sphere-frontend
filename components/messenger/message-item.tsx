import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MessagesFindAllQueryResponseType } from '@/kubb-gen';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FileDown, FileType, ImageIcon, Paperclip, Play, FileIcon, Download } from 'lucide-react';
import Link from 'next/link';

// Вспомогательная функция для форматирования размера файла
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Б';

  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface MessageAttachment {
  id: string;
  url?: string;
  fileUrl?: string;
  name?: string;
  fileName?: string;
  type?: string;
  fileType?: string;
  mimeType?: string;
  duration?: number;
  fileSize?: number;
}

interface MessageItemProps {
  message: MessagesFindAllQueryResponseType['items'][0];
  highlightText?: (text: string) => React.ReactNode;
}

// Интерфейсы для компонентов
interface SimpleAudioPlayerProps {
  audioUrl: string;
  isVoice: boolean;
}

interface MessageContentProps {
  message: MessagesFindAllQueryResponseType['items'][0];
  highlightText?: (text: string) => React.ReactNode;
}

const MessageItem = ({ message, highlightText }: MessageItemProps) => {
  const isEvent = message.type === 'EVENT';
  const isFavorite = message.isFavorite;

  // Отладка - выводим содержимое сообщения и вложений в консоль
  React.useEffect(() => {
    if (message.type === 'VOICE') {
      console.log('Голосовое сообщение:', message);
      console.log('ID сообщения:', message.id);
      console.log('Тип сообщения:', message.type);

      // Проверка всех потенциальных источников URL
      if (message.voiceUrl) {
        console.log('voiceUrl из сообщения:', message.voiceUrl);
      }

      if (message.url) {
        console.log('url из сообщения:', message.url);
      }

      if (message.fileUrl) {
        console.log('fileUrl из сообщения:', message.fileUrl);
      }

      console.log('Вложения:', message.attachments);

      // Дополнительная проверка структуры сообщения для отладки
      if (message.attachmentUrls) {
        console.log('attachmentUrls из сообщения:', message.attachmentUrls);
      }

      // Проверка объекта message.attachment
      if (message.attachment) {
        console.log('Найден объект attachment:', message.attachment);
      }

      // Проверяем наличие других полей
      console.log('Все поля сообщения:', Object.keys(message));

      // Временное решение: если нет вложений но есть идентификатор сообщения,
      // сформируем примерный URL для тестирования
      if (!message.attachments && message.id && !message.voiceUrl) {
        console.log('Пробуем создать временный URL для тестирования');
        const tempUrl = `/api/attachments/voice/${message.id}.mp3`;
        console.log('Временный URL:', tempUrl);
        // @ts-ignore
        message.tempVoiceUrl = tempUrl;
      }
    }
  }, [message]);

  // Состояние загрузки аудио
  const [audioLoadingState, setAudioLoadingState] = React.useState<
    'initial' | 'loading' | 'error' | 'loaded'
  >('initial');
  const audioLoadAttemptRef = React.useRef(0);
  const maxLoadAttempts = 3;
  const [errorDetails, setErrorDetails] = React.useState<string>('');

  // Получаем аудио URL для воспроизведения
  const getAudioUrl = React.useCallback(() => {
    // Для VOICE сообщений
    if (message.type === 'VOICE') {
      console.log('Проверка вложений для ID сообщения:', message.id);

      // Проверяем все возможные источники URL для голосовых сообщений

      // 1. Прямые URL в сообщении
      if (message.voiceUrl) {
        console.log('Найден URL в voiceUrl:', message.voiceUrl);
        return message.voiceUrl;
      }

      if (message.fileUrl) {
        console.log('Найден URL в fileUrl сообщения:', message.fileUrl);
        return message.fileUrl;
      }

      if (message.url) {
        console.log('Найден URL в url сообщения:', message.url);
        return message.url;
      }

      // Проверка временного URL для тестирования
      // @ts-ignore
      if (message.tempVoiceUrl) {
        // @ts-ignore
        console.log('Используем временный URL:', message.tempVoiceUrl);
        // @ts-ignore
        return message.tempVoiceUrl;
      }

      // 2. Проверка объекта attachment
      if (message.attachment) {
        const attachmentUrl = message.attachment.fileUrl || message.attachment.url;
        if (attachmentUrl) {
          console.log('Найден URL в объекте attachment:', attachmentUrl);
          return attachmentUrl;
        }

        // Если есть ID вложения, формируем API URL
        if (message.attachment.id) {
          const apiUrl = `/api/attachments/voice/${message.attachment.id}.mp3`;
          console.log('Сформирован API URL по ID вложения:', apiUrl);
          return apiUrl;
        }
      }

      // 3. Проверка массива attachments
      if (
        message.attachments &&
        Array.isArray(message.attachments) &&
        message.attachments.length > 0
      ) {
        for (const attachment of message.attachments) {
          // Проверка на валидность объекта
          if (attachment && typeof attachment === 'object') {
            // Сначала пробуем получить URL из вложения
            const url = attachment.fileUrl || attachment.url;
            if (url) {
              console.log('Найден URL в attachments:', url);
              return url;
            }

            // Если есть ID, формируем API URL для аудио
            if (attachment.id) {
              const apiUrl = `/api/attachments/voice/${attachment.id}.mp3`;
              console.log('Сформирован API URL по ID вложения из attachments:', apiUrl);
              return apiUrl;
            }
          }
        }
      }

      // 4. Если есть объект messageAttachment и в нем есть ID, формируем API URL
      if (message.messageAttachment && message.messageAttachment.id) {
        const apiUrl = `/api/attachments/voice/${message.messageAttachment.id}.mp3`;
        console.log('Сформирован API URL по ID из messageAttachment:', apiUrl);
        return apiUrl;
      }

      // 5. Проверка attachmentUrls
      if (
        message.attachmentUrls &&
        Array.isArray(message.attachmentUrls) &&
        message.attachmentUrls.length > 0
      ) {
        console.log('Найден URL в attachmentUrls:', message.attachmentUrls[0]);
        return message.attachmentUrls[0];
      }

      // 6. Для обратной совместимости - проверяем любое поле, которое может содержать URL
      const messageAny = message as any;
      const possibleUrlFields = ['audioUrl', 'audioFileUrl', 'voice', 'audioSrc', 'src'];

      for (const field of possibleUrlFields) {
        if (messageAny[field] && typeof messageAny[field] === 'string') {
          console.log(`Найден URL в дополнительном поле ${field}:`, messageAny[field]);
          return messageAny[field];
        }
      }

      // 7. Если есть ID сообщения, формируем API URL через ID сообщения
      if (message.id) {
        // Используем ID сообщения для формирования URL
        const apiUrl = `/api/attachments/voice/${message.id}.mp3`;
        console.log('Сформирован API URL по ID сообщения:', apiUrl);
        return apiUrl;
      }
    }

    return null;
  }, [message]);

  const audioUrl = message.type === 'VOICE' ? getAudioUrl() : '';

  // Определяем тип вложения по имени файла или MIME-типу
  const getAttachmentType = (attachment: MessageAttachment) => {
    // Используем любое доступное имя файла
    const name = (attachment.name || attachment.fileName || '').toLowerCase();
    // Используем любой доступный тип
    const mimeType = (
      attachment.type ||
      attachment.fileType ||
      attachment.mimeType ||
      ''
    ).toLowerCase();

    if (
      mimeType.startsWith('image/') ||
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg') ||
      name.endsWith('.png') ||
      name.endsWith('.gif') ||
      name.endsWith('.webp')
    ) {
      return 'image';
    }

    if (
      mimeType === 'audio/mpeg' ||
      mimeType === 'audio/mp3' ||
      attachment.duration ||
      name.endsWith('.mp3')
    ) {
      return 'audio';
    }

    return 'file';
  };

  // Форматируем дату
  const formattedDate = React.useMemo(() => {
    if (!message.createdAt) return '';

    const date = new Date(message.createdAt);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    return isToday
      ? format(date, 'HH:mm', { locale: ru })
      : format(date, 'd MMM, HH:mm', { locale: ru });
  }, [message.createdAt]);

  // Проверка доступности URL перед загрузкой аудио
  const checkAudioUrl = React.useCallback(async (url: string): Promise<boolean> => {
    try {
      // Получаем токен из локального хранилища или sessionStorage
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

      // Делаем HEAD запрос для проверки доступности, чтобы не загружать весь файл
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          // Добавляем заголовок авторизации, если есть токен
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      if (response.ok) {
        console.log(`URL аудио доступен: ${url}, статус: ${response.status}`);
        return true;
      } else {
        console.warn(`URL аудио недоступен: ${url}, статус: ${response.status}`);

        // Устанавливаем детали ошибки для отображения пользователю
        setErrorDetails(`Статус ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error(`Ошибка при проверке URL аудио: ${url}`, error);
      setErrorDetails('Ошибка сети');
      return false;
    }
  }, []);

  // Загрузка аудио файла в фоне при монтировании компонента
  React.useEffect(() => {
    if (message.type === 'VOICE' && audioUrl) {
      let isMounted = true;
      setAudioLoadingState('loading');
      audioLoadAttemptRef.current = 0;
      setErrorDetails('');

      const attemptLoad = async (url: string, attempt: number) => {
        if (!isMounted || attempt >= maxLoadAttempts) return;

        console.log(`Попытка загрузки аудио #${attempt + 1}: ${url}`);

        // Получаем токен из локального хранилища или sessionStorage
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

        // Проверка доступности URL перед началом загрузки
        const isUrlAvailable = await checkAudioUrl(url);

        if (!isUrlAvailable) {
          // Если URL недоступен (404), сразу переходим к следующей попытке
          if (attempt < maxLoadAttempts - 1) {
            const nextAttempt = attempt + 1;
            audioLoadAttemptRef.current = nextAttempt;

            // Создаем новый URL с альтернативным форматом
            // Для второй попытки используем другую структуру URL
            let newUrlBase;
            if (nextAttempt === 1) {
              // Вторая попытка - используем другую структуру пути
              newUrlBase = url.includes('?')
                ? url.replace('/api/attachments/voice/', '/api/attachments/files/voice/')
                : `${url}?attempt=${nextAttempt}&t=${Date.now()}`;
            } else {
              // Третья попытка - стандартная структура с меткой времени
              newUrlBase = url.includes('?')
                ? `${url.split('?')[0]}?attempt=${nextAttempt}&t=${Date.now()}`
                : `${url}?attempt=${nextAttempt}&t=${Date.now()}`;
            }

            console.log(`Попытка ${nextAttempt + 1}/${maxLoadAttempts} с новым URL: ${newUrlBase}`);

            // Добавляем токен в URL, если он есть
            let finalUrl = newUrlBase;
            if (token && !finalUrl.includes('token=')) {
              finalUrl = finalUrl.includes('?')
                ? `${finalUrl}&token=${token}`
                : `${finalUrl}?token=${token}`;
            }

            // Задержка перед следующей попыткой
            const delay = Math.min(1000 * Math.pow(1.5, nextAttempt), 5000);
            setTimeout(() => {
              if (isMounted) {
                attemptLoad(finalUrl, nextAttempt);
              }
            }, delay);

            return;
          } else {
            // Исчерпали все попытки
            if (isMounted) {
              console.error(`Все попытки загрузки аудио исчерпаны: ${url}`);
              setAudioLoadingState('error');
            }
            return;
          }
        }

        // Если URL доступен, продолжаем загрузку с Audio API
        const preloadAudio = new Audio();
        let loadTimeout: ReturnType<typeof setTimeout>;

        // Добавляем событие при загрузке для установки токена авторизации
        if (token) {
          // Добавляем токен в URL для авторизации
          if (!url.includes('token=')) {
            url = url.includes('?')
              ? `${url}&token=${encodeURIComponent(token)}`
              : `${url}?token=${encodeURIComponent(token)}`;
          }
          console.log('Добавлен токен авторизации в URL аудио');
        }

        // Устанавливаем таймаут на загрузку
        loadTimeout = setTimeout(() => {
          if (isMounted && audioLoadingState === 'loading') {
            console.warn(`Таймаут предзагрузки аудио: ${url}, попытка: ${attempt + 1}`);
            preloadAudio.src = '';

            // Повторная попытка с новым URL
            if (attempt < maxLoadAttempts - 1) {
              const nextAttempt = attempt + 1;
              audioLoadAttemptRef.current = nextAttempt;

              // Создаем новый URL с новым временным штампом
              let newUrl = url.includes('?')
                ? `${url.split('?')[0]}?attempt=${nextAttempt}&t=${Date.now()}`
                : `${url}?attempt=${nextAttempt}&t=${Date.now()}`;

              // Добавляем токен в URL, если он есть
              if (token && !newUrl.includes('token=')) {
                newUrl = newUrl.includes('?')
                  ? `${newUrl}&token=${token}`
                  : `${newUrl}?token=${token}`;
              }

              // Задержка перед следующей попыткой
              const delay = Math.min(1000 * Math.pow(1.5, nextAttempt), 5000);
              setTimeout(() => {
                if (isMounted) {
                  attemptLoad(newUrl, nextAttempt);
                }
              }, delay);
            } else {
              // Исчерпали все попытки
              if (isMounted) {
                setAudioLoadingState('error');
                setErrorDetails('Таймаут загрузки');
              }
            }
          }
        }, 10000); // 10 секунд на загрузку

        const handleCanPlayThrough = () => {
          if (isMounted) {
            console.log(`Аудио файл успешно предзагружен: ${url}`);
            clearTimeout(loadTimeout);
            setAudioLoadingState('loaded');
            setErrorDetails('');
          }
        };

        const handleError = (e: Event) => {
          if (isMounted) {
            // Пытаемся получить детали ошибки
            let errorMsg = 'Неизвестная ошибка';

            if (e.target && (e.target as HTMLMediaElement).error) {
              const mediaError = (e.target as HTMLMediaElement).error;
              switch (mediaError?.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                  errorMsg = 'Загрузка прервана';
                  break;
                case MediaError.MEDIA_ERR_NETWORK:
                  errorMsg = 'Ошибка сети';
                  break;
                case MediaError.MEDIA_ERR_DECODE:
                  errorMsg = 'Ошибка декодирования';
                  break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                  errorMsg = 'Формат не поддерживается';
                  break;
              }
            }

            console.warn(`Не удалось предзагрузить аудио: ${url}, ошибка: ${errorMsg}`);
            clearTimeout(loadTimeout);
            setErrorDetails(errorMsg);

            // Проверяем возможность повторной попытки
            if (attempt < maxLoadAttempts - 1) {
              const nextAttempt = attempt + 1;
              audioLoadAttemptRef.current = nextAttempt;

              // Экспоненциальная задержка перед следующей попыткой
              const delay = Math.min(1000 * Math.pow(1.5, nextAttempt), 5000);

              setTimeout(() => {
                if (isMounted) {
                  // Для второй попытки используем другую структуру URL
                  let newUrl;
                  if (nextAttempt === 1) {
                    // Вторая попытка - альтернативный формат
                    newUrl = url.replace(
                      '/api/attachments/voice/',
                      '/api/attachments/files/voice/',
                    );
                  } else {
                    // Третья попытка - стандартный формат
                    newUrl = url.includes('?')
                      ? `${url.split('?')[0]}?attempt=${nextAttempt}&t=${Date.now()}`
                      : `${url}?attempt=${nextAttempt}&t=${Date.now()}`;
                  }

                  // Добавляем токен если необходимо
                  if (token && !newUrl.includes('token=')) {
                    newUrl = newUrl.includes('?')
                      ? `${newUrl}&token=${token}`
                      : `${newUrl}?token=${token}`;
                  }

                  console.log(
                    `Повторная попытка загрузки аудио (${nextAttempt + 1}/${maxLoadAttempts}): ${newUrl}`,
                  );
                  attemptLoad(newUrl, nextAttempt);
                }
              }, delay);
            } else {
              // Исчерпали все попытки
              if (isMounted) {
                setAudioLoadingState('error');
              }
            }
          }
        };

        preloadAudio.addEventListener('canplaythrough', handleCanPlayThrough);
        preloadAudio.addEventListener('error', handleError);
        preloadAudio.preload = 'metadata';
        preloadAudio.src = url;

        return () => {
          clearTimeout(loadTimeout);
          preloadAudio.removeEventListener('canplaythrough', handleCanPlayThrough);
          preloadAudio.removeEventListener('error', handleError);
          preloadAudio.src = '';
        };
      };

      // Запускаем первую попытку загрузки
      attemptLoad(audioUrl, 0).then((cleanup) => {
        return () => {
          isMounted = false;
          if (cleanup) cleanup();
        };
      });

      return () => {
        isMounted = false;
      };
    }
  }, [message.type, audioUrl, audioLoadingState, checkAudioUrl]);

  // Функция для обновления URL и перезагрузки аудио
  const refreshAudioUrl = React.useCallback(() => {
    if (message.type === 'VOICE') {
      audioLoadAttemptRef.current = 0;
      setAudioLoadingState('loading');
      setErrorDetails('');

      // Получаем базовый URL без параметров
      const baseUrl = getAudioUrl().split('?')[0];

      // Создаем URL с другой структурой для обхода возможных ограничений
      const alternateUrl = baseUrl.includes('/voice/')
        ? baseUrl.replace('/voice/', '/files/voice/')
        : baseUrl;

      const newUrl = `${alternateUrl}?refresh=true&t=${Date.now()}`;
      console.log('Обновление URL для аудио:', newUrl);
      return newUrl;
    }
    return '';
  }, [message.type, getAudioUrl]);

  // Получаем URL для любого типа вложения
  const getFileUrl = React.useCallback(
    (type: string) => {
      if (!message) return null;

      // Для голосовых сообщений (используем публичный эндпоинт для аудио)
      if (type === 'voice' && (message.type === 'VOICE' || message.type === 'AUDIO')) {
        console.log('Поиск URL для голосового сообщения:', message.id);

        // Прямые URL в сообщении
        if (message.voiceUrl) {
          console.log('Найден voiceUrl:', message.voiceUrl);
          return message.voiceUrl;
        }
        if (message.fileUrl) {
          console.log('Найден fileUrl:', message.fileUrl);
          return message.fileUrl;
        }
        if (message.url) {
          console.log('Найден url:', message.url);
          return message.url;
        }

        // Проверка messageAttachment
        if (message.messageAttachment?.id) {
          const apiUrl = `/api/attachments/voice/${message.messageAttachment.id}.mp3`;
          console.log('Найден messageAttachment.id, сформирован URL:', apiUrl);
          return apiUrl;
        }

        // Проверка attachment
        if (message.attachment) {
          if (message.attachment.fileUrl) {
            console.log('Найден attachment.fileUrl:', message.attachment.fileUrl);
            return message.attachment.fileUrl;
          }
          if (message.attachment.url) {
            console.log('Найден attachment.url:', message.attachment.url);
            return message.attachment.url;
          }
          if (message.attachment.id) {
            const apiUrl = `/api/attachments/voice/${message.attachment.id}.mp3`;
            console.log('Найден attachment.id, сформирован URL:', apiUrl);
            return apiUrl;
          }
        }

        // Проверка attachments
        if (message.attachments?.length > 0) {
          for (const attachment of message.attachments) {
            if (!attachment) continue;

            if (attachment.fileUrl) {
              console.log('Найден attachments[].fileUrl:', attachment.fileUrl);
              return attachment.fileUrl;
            }
            if (attachment.url) {
              console.log('Найден attachments[].url:', attachment.url);
              return attachment.url;
            }
            if (attachment.id) {
              const apiUrl = `/api/attachments/voice/${attachment.id}.mp3`;
              console.log('Найден attachments[].id, сформирован URL:', apiUrl);
              return apiUrl;
            }
          }
        }

        // Используем ID сообщения как последний вариант
        if (message.id) {
          const apiUrl = `/api/attachments/voice/${message.id}.mp3`;
          console.log('Используем ID сообщения как fallback, сформирован URL:', apiUrl);
          return apiUrl;
        }

        console.log('Не удалось найти URL для голосового сообщения', message);
        return null;
      }

      // Для изображений
      if (type === 'image' && message.type === 'IMAGE') {
        // Прямые URL в сообщении
        if (message.imageUrl) return message.imageUrl;
        if (message.fileUrl) return message.fileUrl;
        if (message.url) return message.url;

        // Проверка attachment
        if (message.attachment?.id) {
          return `/api/attachments/image/${message.attachment.id}`;
        }

        // Проверка attachments
        if (message.attachments?.length > 0) {
          for (const attachment of message.attachments) {
            if (!attachment) continue;

            if (attachment.fileUrl) return attachment.fileUrl;
            if (attachment.url) return attachment.url;
            if (attachment.id) {
              return `/api/attachments/image/${attachment.id}`;
            }
          }
        }

        // Используем ID сообщения как последний вариант
        if (message.id) {
          return `/api/attachments/image/${message.id}`;
        }
      }

      // Для обычных файлов
      if (type === 'file' && (message.type === 'FILE' || message.type === 'ATTACHMENT')) {
        // Прямые URL в сообщении
        if (message.fileUrl) return message.fileUrl;
        if (message.url) return message.url;

        // Проверка attachment
        if (message.attachment?.id) {
          return `/api/attachments/file/${message.attachment.id}`;
        }

        // Проверка attachments
        if (message.attachments?.length > 0) {
          for (const attachment of message.attachments) {
            if (!attachment) continue;

            if (attachment.fileUrl) return attachment.fileUrl;
            if (attachment.url) return attachment.url;
            if (attachment.id) {
              return `/api/attachments/file/${attachment.id}`;
            }
          }
        }

        // Используем ID сообщения как последний вариант
        if (message.id) {
          return `/api/attachments/file/${message.id}`;
        }
      }

      return null;
    },
    [message],
  );

  // Компонент для отображения аудио плеера
  const SimpleAudioPlayer = ({ audioUrl, isVoice }: SimpleAudioPlayerProps) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);

    // Получаем токен авторизации для аудио
    const [finalAudioUrl, setFinalAudioUrl] = React.useState(audioUrl);

    // Добавляем токен в URL для авторизации при монтировании компонента
    React.useEffect(() => {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      if (token && audioUrl && !audioUrl.includes('token=')) {
        const urlWithToken = audioUrl.includes('?')
          ? `${audioUrl}&token=${encodeURIComponent(token)}`
          : `${audioUrl}?token=${encodeURIComponent(token)}`;
        console.log('Добавлен токен авторизации в URL для плеера');
        setFinalAudioUrl(urlWithToken);
      } else {
        setFinalAudioUrl(audioUrl);
      }
    }, [audioUrl]);

    const togglePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch((error) => {
            console.error('Ошибка воспроизведения:', error);
          });
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleTimeUpdate = () => {
      const audio = audioRef.current;
      if (!audio) return;

      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      const audio = audioRef.current;
      if (!audio) return;

      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
      }
    };

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className="flex items-center rounded-md bg-gray-100 p-2">
        <button
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white"
          onClick={togglePlay}
        >
          {isPlaying ? <span>❚❚</span> : <Play size={16} />}
        </button>
        <div className="ml-2 flex-1">
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-300">
            <div
              className="h-1 bg-primary"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={finalAudioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />
      </div>
    );
  };

  // Компонент для отображения содержимого сообщения в зависимости от типа
  const MessageContent = ({ message, highlightText }: MessageContentProps) => {
    // Проверяем тип сообщения
    const messageType = message.type;

    // Для текстовых сообщений
    if (messageType === 'TEXT') {
      return (
        <div className="text-sm">{highlightText ? highlightText(message.text) : message.text}</div>
      );
    }

    // Для аудио сообщений (голосовых и аудио файлов)
    if (messageType === 'VOICE' || messageType === 'AUDIO') {
      const isVoice = messageType === 'VOICE';
      const audioUrl = getFileUrl('voice');

      return (
        <div className="flex flex-col gap-1">
          {audioUrl ? (
            <SimpleAudioPlayer audioUrl={audioUrl} isVoice={isVoice} />
          ) : (
            <div className="rounded-md bg-gray-100 p-3 text-gray-500">Аудио недоступно</div>
          )}
          {message.text &&
            message.text !== 'Голосовое сообщение' &&
            message.text !== 'Аудио файл' && (
              <div className="mt-2 text-sm">
                {highlightText ? highlightText(message.text) : message.text}
              </div>
            )}
        </div>
      );
    }

    // Для изображений
    if (messageType === 'IMAGE') {
      const imageUrl = getFileUrl('image');
      return (
        <div className="flex flex-col gap-1">
          {imageUrl ? (
            <div className="relative overflow-hidden rounded-md">
              <img
                src={imageUrl}
                alt={message.text || 'Изображение'}
                className="max-h-64 max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="rounded-md bg-gray-100 p-3 text-gray-500">Изображение недоступно</div>
          )}
          <div className="mt-2 text-sm">
            {highlightText ? highlightText(message.text) : message.text}
          </div>
        </div>
      );
    }

    // Для файлов
    if (messageType === 'FILE' || messageType === 'ATTACHMENT') {
      const fileUrl = getFileUrl('file');
      // Получаем информацию о файле
      let fileName = 'Файл';
      let fileSize = '';

      if (message.attachment) {
        fileName = message.attachment.fileName || message.attachment.name || 'Файл';
        if (message.attachment.fileSize) {
          fileSize = formatFileSize(message.attachment.fileSize);
        }
      } else if (message.attachments && message.attachments.length > 0) {
        const attachment = message.attachments[0];
        fileName = attachment.fileName || attachment.name || 'Файл';
        if (attachment.fileSize) {
          fileSize = formatFileSize(attachment.fileSize);
        }
      }

      return (
        <div className="flex flex-col gap-1">
          <div className="rounded-md bg-gray-100 p-3">
            <div className="flex items-center">
              <div className="mr-3">
                <FileIcon className="text-xl text-primary" />
              </div>
              <div className="mr-2 flex-1">
                <div className="truncate text-sm font-medium">{fileName}</div>
                {fileSize && <div className="text-xs text-gray-500">{fileSize}</div>}
              </div>
              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-dark text-primary"
                >
                  <Download />
                </a>
              )}
            </div>
          </div>
          <div className="mt-2 text-sm">
            {highlightText ? highlightText(message.text) : message.text}
          </div>
        </div>
      );
    }

    // Для событий
    if (messageType === 'EVENT') {
      return <div className="rounded-lg bg-gray-100 p-2 text-sm text-gray-600">{message.text}</div>;
    }

    // Если тип не распознан, отображаем текст
    return (
      <div className="text-sm">{highlightText ? highlightText(message.text) : message.text}</div>
    );
  };

  return (
    <div
      className={cn('flex items-start gap-3', isEvent ? 'justify-center' : '')}
      data-message-id={message.id}
    >
      {!isEvent && message.senderCabinet && (
        <Avatar className="h-8 w-8 rounded-full border border-muted/20">
          <AvatarImage src={message.senderCabinet?.avatarUrl || undefined} />
          <AvatarFallback>{message.senderCabinet?.companyName?.charAt(0) || '?'}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'group max-w-[70%] rounded-lg px-3 py-2',
          isEvent
            ? 'max-w-md bg-muted/30'
            : message.isOwn
              ? 'bg-purple-600 text-primary-foreground'
              : 'bg-muted',
        )}
      >
        {!isEvent && (
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium">
              {message.isOwn
                ? 'Вы'
                : message.senderCabinet?.companyName || 'Неизвестный отправитель'}
            </span>
            {message.isRead && message.isOwn && (
              <span className="text-xs opacity-70">Прочитано</span>
            )}
          </div>
        )}
        <div className="space-y-1">
          <MessageContent message={message} highlightText={highlightText} />
          {message.attachments?.length > 0 && message.type !== 'VOICE' && (
            <div className="mt-2 flex flex-col gap-2">
              {message.attachments.map((attachment: MessageAttachment) => {
                const attachmentType = getAttachmentType(attachment);
                const attachmentUrl = attachment.fileUrl || attachment.url;

                if (!attachmentUrl) return null;

                if (attachmentType === 'image') {
                  return (
                    <a
                      key={attachment.id}
                      href={attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block overflow-hidden rounded-md"
                    >
                      <img
                        src={attachmentUrl}
                        alt={attachment.name || attachment.fileName || 'Изображение'}
                        className="max-h-[300px] w-auto object-contain"
                      />
                    </a>
                  );
                }

                return (
                  <a
                    key={attachment.id}
                    href={attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm transition',
                      message.isOwn
                        ? 'border-primary-foreground/20 hover:bg-primary-foreground/10'
                        : 'border-muted-foreground/30 hover:bg-muted/80',
                    )}
                  >
                    <FileType className="h-4 w-4" />
                    <span className="flex-1 truncate">
                      {attachment.name || attachment.fileName || 'Файл'}
                    </span>
                    <FileDown className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
          {message.type === 'VOICE' && (
            <div className="mt-2">
              {audioUrl ? (
                <div className="relative">
                  {audioLoadingState === 'loading' ? (
                    <div className="flex items-center space-x-2 rounded-md bg-background/50 p-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span className="text-xs">Загрузка аудио...</span>
                      {audioLoadAttemptRef.current > 0 && (
                        <span className="text-xs text-muted-foreground">
                          Попытка {audioLoadAttemptRef.current + 1}/{maxLoadAttempts}
                        </span>
                      )}
                    </div>
                  ) : audioLoadingState === 'error' ? (
                    <div className="rounded-md bg-destructive/10 p-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-destructive">Не удалось загрузить аудио</span>
                        <span className="text-muted-foreground">{errorDetails}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            const newUrl = refreshAudioUrl();
                            console.log('Новая попытка загрузки аудио с URL:', newUrl);
                          }}
                          className="mt-1 text-xs text-primary hover:underline"
                        >
                          Попробовать снова
                        </button>

                        <div className="text-xs text-muted-foreground" title="ID сообщения">
                          {typeof message.id === 'string'
                            ? message.id.substring(0, 6) + '...'
                            : String(message.id).substring(0, 6) + '...'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <audio
                        preload="metadata"
                        style={{ display: 'none' }}
                        onError={(e) => {
                          console.error(`Ошибка при загрузке аудио ${audioUrl}:`, e);
                          setAudioLoadingState('error');
                        }}
                      >
                        <source src={audioUrl} type="audio/mpeg" />
                      </audio>

                      <div
                        className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-primary/10 p-1 text-xs opacity-0 transition-opacity hover:bg-primary/20 group-hover:opacity-100"
                        onClick={() => {
                          const newUrl = refreshAudioUrl();
                          console.log('Принудительное обновление аудио:', newUrl);
                        }}
                        title="Обновить аудио"
                      >
                        ↻
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="rounded-md bg-background bg-opacity-10 p-2 text-xs text-red-400">
                  Не удалось загрузить аудио. URL не найден.
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            'mt-1 flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100',
            message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          <span className="text-[10px]">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
