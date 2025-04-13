import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  AttachmentsUploadVoiceMutationRequestType,
  AttachmentsUploadVoiceMutationResponseType,
} from '../../types/attachments/AttachmentsUploadVoiceType';
import { useMutation } from '@tanstack/react-query';

export const attachmentsUploadVoiceMutationKey = () =>
  [{ url: '/attachments/upload-voice' }] as const;

export type AttachmentsUploadVoiceMutationKey = ReturnType<
  typeof attachmentsUploadVoiceMutationKey
>;

/**
 * @summary Загрузить голосовое сообщение
 * {@link /attachments/upload-voice}
 */
export async function attachmentsUploadVoice(
  data?: AttachmentsUploadVoiceMutationRequestType,
  config: Partial<RequestConfig<AttachmentsUploadVoiceMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const formData = new FormData();
  if (data) {
    // Подробное логирование входных данных
    console.log('Параметры для создания FormData:', {
      hasFile: !!data.file,
      fileType: data.file instanceof Blob ? data.file.type : 'неизвестно',
      fileSize: data.file instanceof Blob ? data.file.size : 0,
      chatId: data.chatId,
      duration: data.duration,
    });

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data];
      if (key === 'file' && value instanceof Blob) {
        // Добавляем файл в FormData с проверкой
        console.log(`Добавляем файл в FormData. Тип: ${value.type}, размер: ${value.size} байт`);
        formData.append(key, value, 'voice-message.mp3');
      } else if (key === 'chatId' && typeof value === 'string') {
        console.log(`Добавляем chatId в FormData: ${value}`);
        formData.append(key, value);
      } else if (key === 'duration' && typeof value === 'number') {
        console.log('Добавляем duration в формате:', value, typeof value);
        formData.append(key, value.toString());
      }
    });
  }

  // Отладка - проверяем что содержит FormData
  console.log('Отправляем голосовое сообщение с параметрами:');
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${typeof pair[1]} - ${pair[1] instanceof Blob ? 'Blob' : pair[1]}`);
  }

  try {
    console.log('Отправляем запрос на /attachments/upload-voice');
    const res = await request<
      AttachmentsUploadVoiceMutationResponseType,
      ResponseErrorConfig<any>,
      AttachmentsUploadVoiceMutationRequestType
    >({
      method: 'POST',
      url: `/attachments/upload-voice`,
      data: formData,
      ...requestConfig,
      headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
    });

    console.log('Получен ответ от сервера при загрузке голосового сообщения:', res.data);
    return res.data;
  } catch (error) {
    console.error('Ошибка при отправке голосового сообщения на сервер:', error);
    throw error;
  }
}

/**
 * @summary Загрузить голосовое сообщение
 * {@link /attachments/upload-voice}
 */
export function useAttachmentsUploadVoice<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AttachmentsUploadVoiceMutationResponseType,
      ResponseErrorConfig<any>,
      { data?: AttachmentsUploadVoiceMutationRequestType },
      TContext
    >;
    client?: Partial<RequestConfig<AttachmentsUploadVoiceMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? attachmentsUploadVoiceMutationKey();

  return useMutation<
    AttachmentsUploadVoiceMutationResponseType,
    ResponseErrorConfig<any>,
    { data?: AttachmentsUploadVoiceMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      console.log('В useAttachmentsUploadVoice получены данные:', {
        hasData: !!data,
        hasFile: !!data?.file,
        hasChatId: !!data?.chatId,
        duration: data?.duration,
      });
      return attachmentsUploadVoice(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
