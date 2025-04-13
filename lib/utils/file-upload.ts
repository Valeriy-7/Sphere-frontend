import { useAttachmentsUploadFile } from '@/kubb-gen/hooks/attachments/useAttachmentsUploadFile';
import { useAttachmentsUploadVoice } from '@/kubb-gen/hooks/attachments/useAttachmentsUploadVoice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesFindAllQueryKey } from '@/kubb-gen/hooks/messages/useMessagesFindAll';

/**
 * Хук для загрузки обычных файлов в чат
 */
export function useUploadAttachment() {
  const queryClient = useQueryClient();
  const attachmentUpload = useAttachmentsUploadFile();

  return useMutation({
    mutationKey: ['uploadAttachment'],
    mutationFn: async ({ file, chatId }: { file: File; chatId: string }) => {
      try {
        console.log('Загружаем файл:', file.name, 'для чата:', chatId);

        // Передаем файл и chatId напрямую
        const response = await attachmentUpload.mutateAsync({
          data: {
            file,
            chatId,
          },
        });
        return response;
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      // Инвалидируем кэш сообщений для обновления списка
      queryClient.invalidateQueries({
        queryKey: messagesFindAllQueryKey({
          chatId: variables.chatId,
          limit: 100,
          offset: 0,
        }),
      });
    },
  });
}

/**
 * Хук для загрузки голосовых сообщений в чат
 */
export function useUploadVoiceMessage() {
  const queryClient = useQueryClient();
  const voiceUpload = useAttachmentsUploadVoice();

  return useMutation({
    mutationKey: ['uploadVoiceMessage'],
    mutationFn: async ({
      blob,
      chatId,
      duration,
    }: {
      blob: Blob;
      chatId: string;
      duration?: number;
    }) => {
      try {
        console.log('Загружаем голосовое сообщение для чата:', chatId);

        // Проверка типа блоба
        console.log('Тип блоба:', blob.type);
        console.log('Размер блоба:', blob.size, 'байт');

        // Нормализуем MIME тип для более надежной обработки на бэкенде
        let mimeType = blob.type;
        if (!mimeType || mimeType === 'audio/webm') {
          console.log('Преобразуем MIME тип из', mimeType, 'в audio/mpeg');
          mimeType = 'audio/mpeg';
        }

        // Создаем файл из blob с правильным MIME-типом
        const filename = `voice-message-${Date.now()}.${mimeType === 'audio/mpeg' ? 'mp3' : 'ogg'}`;
        const audioFile = new File([blob], filename, { type: mimeType });

        console.log('Создан файл для отправки:', {
          name: audioFile.name,
          size: audioFile.size,
          type: audioFile.type,
        });

        // Устанавливаем минимальную длительность если не передана
        const audioDuration =
          typeof duration === 'number' && duration > 0
            ? duration
            : Math.max(10, Math.round(blob.size / 16000)); // Примерная оценка длительности

        console.log('Длительность аудио:', audioDuration, 'секунд');

        // Проверяем параметры перед отправкой
        const params = {
          file: audioFile,
          chatId,
          duration: audioDuration,
        };

        console.log('Параметры для отправки голосового сообщения:', {
          chatId,
          duration: audioDuration,
          fileSize: audioFile.size,
          fileType: audioFile.type,
          fileName: audioFile.name,
        });

        // Вызываем API загрузки голосового сообщения
        const response = await voiceUpload.mutateAsync({
          data: params,
        });

        console.log('Ответ сервера после загрузки голосового сообщения:', response);

        // Проверяем структуру ответа
        let attachmentData: any = null;
        if (response && typeof response === 'object') {
          if ('attachment' in response && response.attachment) {
            attachmentData = response.attachment;
            console.log('Найдены данные вложения в ответе:', attachmentData);

            // Если есть URL в ответе, логируем его
            if (attachmentData.fileUrl) {
              console.log('Получен URL файла:', attachmentData.fileUrl);
            }
          } else if ('id' in response) {
            // Если response сам является вложением
            attachmentData = response;
            console.log('Ответ сам является вложением:', attachmentData);

            // Если есть URL в ответе, логируем его
            if (attachmentData.fileUrl) {
              console.log('Получен URL файла:', attachmentData.fileUrl);
            }
          } else {
            console.warn('В ответе сервера отсутствует URL для голосового сообщения:', response);

            // Пытаемся создать URL из имеющихся данных
            if (response && 'id' in (response as any)) {
              const s3BaseUrl =
                process.env.NEXT_PUBLIC_S3_ENDPOINT || 'https://storage.yandexcloud.net';
              const s3Bucket = process.env.NEXT_PUBLIC_S3_BUCKET || 'sphere-media';
              const s3VoiceUrl = `${s3BaseUrl}/${s3Bucket}/voice/${(response as any).id}.mp3`;

              console.log('Сгенерирован S3 URL:', s3VoiceUrl);
              (response as any).fileUrl = s3VoiceUrl;
              attachmentData = response;
            }
          }
        }

        // Возвращаем данные вложения или исходный ответ
        return attachmentData || response;
      } catch (error) {
        console.error('Ошибка при загрузке голосового сообщения:', error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log('Голосовое сообщение успешно загружено. Ответ сервера:', data);

      // Инвалидируем кэш сообщений для обновления списка
      queryClient.invalidateQueries({
        queryKey: messagesFindAllQueryKey({
          chatId: variables.chatId,
          limit: 100,
          offset: 0,
        }),
      });
    },
  });
}

/**
 * Функция для определения типа файла по его имени
 */
export function getFileType(fileName: string): 'image' | 'document' | 'other' {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
    return 'image';
  }

  if (['doc', 'docx', 'pdf', 'txt', 'rtf', 'xls', 'xlsx', 'csv'].includes(extension)) {
    return 'document';
  }

  return 'other';
}

/**
 * Функция для форматирования размера файла
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kB = bytes / 1024;
  if (kB < 1024) {
    return `${Math.round(kB * 10) / 10} KB`;
  }

  const MB = kB / 1024;
  return `${Math.round(MB * 10) / 10} MB`;
}
